import assert from 'node:assert/strict'
import { createRegistry, validateDeclaration, validateSnapshot } from '@nuxtjp/declarative-ui/interaction'
const registry = createRegistry()
const declaration = { id: 'example', revision: 'd1', title: 'Synthetic view', nodes: [] }
const snapshot = { scope: 'example', cursor: 'c1', declaration_revision: 'd1', declaration, resources: [] }
assert.deepEqual(validateDeclaration(declaration, registry), [])
assert.deepEqual(validateSnapshot(snapshot, 'example', registry), [])
assert.ok(validateSnapshot(snapshot, 'other', registry).includes('snapshot/scope/mismatch'))
assert.ok(validateDeclaration({ ...declaration, nodes: [{ id: 'bad', kind: 'module', src: 'file:///tmp/not-executed.mjs' }] }, registry).length)
registry.seal()
assert.throws(() => registry.register('late', { required: [], optional: [] }))
console.log(JSON.stringify({ publicImports: true, exactSnapshot: true, scopeRefusal: true, executableDeclarationRefused: true, accountAuthority: false }))
