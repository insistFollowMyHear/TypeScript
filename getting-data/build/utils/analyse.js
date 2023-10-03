"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const cheerio_1 = __importDefault(require("cheerio"));
const moment_1 = __importDefault(require("moment"));
class DellAnalyse {
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DellAnalyse();
        }
        return this.instance;
    }
    getJsonInfo(html) {
        const $ = cheerio_1.default.load(html);
        const courseItems = $('.course-item');
        const courseInfos = [];
        courseItems.map((index, elemnet) => {
            const descs = $(elemnet).find('.course-desc');
            const title = descs.eq(0).text();
            const count = parseInt(descs.eq(1).text().split('：')[1], 10);
            courseInfos.push({ title, count });
        });
        const result = {
            time: (0, moment_1.default)(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            data: courseInfos,
        };
        return result;
    }
    generateJsonContent(courseResult, filePath) {
        let fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseResult.time] = courseResult.data;
        return JSON.stringify(fileContent);
    }
    analyse(html, filePath) {
        const course = this.getJsonInfo(html);
        const fileContent = this.generateJsonContent(course, filePath);
        return fileContent;
    }
}
exports.default = DellAnalyse;
