import {defineConfig} from 'vitest/config';
export default defineConfig({test:{environment:'node',include:['evidence/app-regression.test.jsx'],poolOptions:{threads:{singleThread:true}}},esbuild:{jsx:'automatic'}});
