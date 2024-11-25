import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

console.log('EDGE_STORE_ACCESS_KEY:', process.env.EDGE_STORE_ACCESS_KEY);
console.log('EDGE_STORE_SECRET_KEY:', process.env.EDGE_STORE_SECRET_KEY);
const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
