import fs from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkExtract from 'remark-extract-frontmatter';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import yaml from 'yaml';

const __dirname = new URL('.', import.meta.url).pathname;
// readPage();

async function readPage(filename) {
	const content = await fs.readFile(path.join(__dirname, filename), 'utf-8');

	const file = await unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkExtract, { yaml: yaml.parse })
		.use(remarkRehype)
		.use(rehypeHighlight)
		.use(rehypeStringify)
		.process(content);

	return {
		...file.data,
		html: String(file)
	};
}

fs.readdir(path.join(__dirname, './homepage'))
	.then((filenames) => filenames.map((filename) => path.join('homepage', filename)))
	.then((filenames) => Promise.all(filenames.map((filename) => readPage(filename))))
	.then((content) => JSON.stringify(content))
	.then((data) => fs.writeFile(path.join(__dirname, 'homepage.json'), data, 'utf-8'));
