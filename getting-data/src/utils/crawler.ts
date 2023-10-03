// ts -> .d.ts 翻译文件 -> .js
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';

export interface Analyse {
  analyse: (html: string, filePath: string) => string;
}

class Crawler {
  private filePath = path.resolve(__dirname, '../../data/course.json');

  constructor(private url: string, private analyse: Analyse) {
    this.initSpiderProcess();
  }

  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyse.analyse(html, this.filePath);
    this.writeFile(fileContent)
  }
}

export default Crawler;  