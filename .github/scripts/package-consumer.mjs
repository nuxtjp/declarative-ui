import assert from 'node:assert/strict'
import { execFileSync, spawn } from 'node:child_process'
import { mkdtempSync, writeFileSync, copyFileSync, readFileSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { createServer } from 'node:net'
const archive = resolve(process.argv[2]), project = mkdtempSync(join(tmpdir(), 'public-ui-consumer-'))
const env = { ...process.env, CI:'true', NUXT_TELEMETRY_DISABLED:'1', NPM_CONFIG_REGISTRY:'https://registry.npmjs.org',
 NPM_CONFIG_USERCONFIG:join(project,'empty.npmrc'), NPM_CONFIG_GLOBALCONFIG:join(project,'empty-global.npmrc'),
 NODE_AUTH_TOKEN:'', NPM_TOKEN:'', GH_TOKEN:'', GITHUB_TOKEN:'' }
const pm=['npm','exec','--yes','--ignore-scripts','--package=pnpm@10.29.3','--','pnpm']
function run(args) { try { return execFileSync(args[0],args.slice(1),{cwd:project,env,encoding:'utf8',timeout:240000}) }
 catch(error) { throw new Error(`${args[0]} failed: ${String(error.stdout ?? '').slice(-1600)} ${String(error.stderr ?? '').slice(-1600)}`) } }
let server
try {
 writeFileSync(env.NPM_CONFIG_USERCONFIG,'');writeFileSync(env.NPM_CONFIG_GLOBALCONFIG,'')
 writeFileSync(join(project,'package.json'),JSON.stringify({private:true,type:'module',packageManager:'pnpm@10.29.3',pnpm:{overrides:{'@nuxtjp/dependency-security':'0.2.2'}},dependencies:{
 'simple-git':'4.0.2','@nuxtjp/declarative-ui':`file:${archive}`,'@nuxtjp/localized-site':'0.5.1',nuxt:'4.6.0',vue:'3.5.43','@nuxt/ui':'4.11.3',typescript:'5.9.3','vue-tsc':'3.2.8'}}))
 run([...pm,'install','--ignore-scripts'])
 // Reuse the managed Nuxt dependency-security setup as development tooling.
 // Explicit Git fixture exercises its ESM backport even when current devtools
 // no longer imports simple-git; it is not a UI runtime dependency.
 run(['node','node_modules/@nuxtjp/localized-site/security/apply.mjs','--project-root','.','--apply'])
 run([...pm,'install','--no-frozen-lockfile','--ignore-scripts']);run([...pm,'install','--frozen-lockfile','--ignore-scripts']);run(['node','node_modules/@nuxtjp/localized-site/security/dependency-security.check.cjs'])
 copyFileSync(new URL('../../playground/public-api/demo.mjs',import.meta.url),join(project,'demo.mjs'))
 process.stdout.write(run(['node','demo.mjs']))
 writeFileSync(join(project,'consumer.mts'),"import {createRegistry, validateSnapshot, type ViewSnapshot} from '@nuxtjp/declarative-ui/interaction';\nconst view:ViewSnapshot={scope:'example',cursor:'c1',declaration_revision:'d1',declaration:{id:'example',revision:'d1',title:'Example',nodes:[]},resources:[]};validateSnapshot(view,'example',createRegistry());\n")
 run(['node','node_modules/typescript/bin/tsc','--noEmit','--strict','--skipLibCheck','--module','NodeNext','--moduleResolution','NodeNext','consumer.mts'])
 writeFileSync(join(project,'nuxt.config.ts'),"export default defineNuxtConfig({modules:['@nuxt/ui','@nuxtjp/declarative-ui'],devtools:{enabled:false},ui:{fonts:false},compatibilityDate:'2026-09-01'})")
 writeFileSync(join(project,'tsconfig.json'),'{"extends":"./.nuxt/tsconfig.json"}')
 writeFileSync(join(project,'app.vue'),`<script setup lang="ts">import type {ViewSnapshot} from '@nuxtjp/declarative-ui/interaction';const snapshot:ViewSnapshot={scope:'example',cursor:'c1',declaration_revision:'d1',declaration:{id:'example',revision:'d1',title:'Synthetic public consumer',nodes:[]},resources:[]}</script><template><NuxtJpInteractionView :snapshot="snapshot" /></template>`)
 run([...pm,'exec','nuxt','build']);run([...pm,'exec','nuxt','typecheck'])
 const port=await new Promise(done=>{const socket=createServer().listen(0,'127.0.0.1',()=>{const value=socket.address().port;socket.close(()=>done(value))})})
 server=spawn('node',['.output/server/index.mjs'],{cwd:project,env:{...env,NITRO_HOST:'127.0.0.1',NITRO_PORT:String(port)},stdio:'ignore'})
 let ready=false
 for(let i=0;i<40;i++){try{const r=await fetch(`http://127.0.0.1:${port}`);if(r.ok){assert.ok((await r.text()).includes('Synthetic public consumer'));ready=true;break}}catch{} await new Promise(done=>setTimeout(done,250))}
 assert.ok(ready,'Public component SSR did not become ready')
 const lock=readFileSync(join(project,'pnpm-lock.yaml'),'utf8');assert.ok(!lock.includes('ecosystem-private'))
 console.log(JSON.stringify({publicTGZ:true,publicTypes:true,componentSSR:true,realAccount:false,sourceSiblingCheckout:false}))
} finally { server?.kill('SIGTERM');rmSync(project,{recursive:true,force:true}) }
