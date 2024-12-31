
import {pino,  multistream } from 'pino'

import pinoPretty from 'pino-pretty';
import fs from 'fs';
import path from'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 设置日志文件存放的目录路径
const logDirPath = path.join(__dirname, '../', 'logs');

// 创建日志文件所在目录（如果不存在）
if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath, { recursive: true });
}

// 设置日志文件名格式，这里以日期作为文件名的一部分
const logFileNameFormat = `${new Date().toISOString().slice(0, 10)}-app.log`;

// 定义日志文件的路径
const logFilePath = path.join(logDirPath, logFileNameFormat);

// 创建可写入日志文件的流，设置 flags 为 'a' 表示追加模式
const writeStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const stream = [
  {stream: writeStream, level: 'info'},
  {stream: pinoPretty(), level: 'info'}
]

export const logger = pino({}, multistream(stream));
