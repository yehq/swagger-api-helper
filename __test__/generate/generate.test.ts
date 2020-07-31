import path from 'path';
import fs from 'fs';
import generate from '../../src/generate';
import { Authorization, urls } from '../config';
import { removeFolder } from '../utils';

it('generate services', async () => {
    const outputPath = path.join(__dirname, './services');
    removeFolder(outputPath);

    await generate({
        tagAlias: {
            pet: 'petAlias',
        },
        fetchOptions: {
            headers: {
                Authorization,
            },
        },
        urls: [urls[0]],
        outputPath,
        hasExtraFetchOptions: true,
    });

    await generate({
        tagAlias: {
            pet: 'petAlias',
        },
        fetchOptions: {
            headers: {
                Authorization,
            },
        },
        urls: [urls[1]],
        include: ['user'],
        outputPath,
        hasExtraFetchOptions: true,
    });

    const dirs = fs.readdirSync(outputPath);

    dirs.forEach(dir => {
        const filenames = fs.readdirSync(path.join(outputPath, dir));
        filenames.forEach(filename => {
            const content = fs.readFileSync(path.join(outputPath, dir, filename), {
                encoding: 'utf-8',
            });
            expect(content).toMatchSnapshot();
        });
    });
}, 10000);
