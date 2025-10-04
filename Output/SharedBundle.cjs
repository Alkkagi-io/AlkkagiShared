var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// AlkkagiShared/Utils/BundleHelper/BundleIndex.js
var BundleIndex_exports = {};
__export(BundleIndex_exports, {
  BufferReadHandle: () => BufferReadHandle,
  BufferWriteHandle: () => BufferWriteHandle,
  ELogLevel: () => ELogLevel,
  ELogMode: () => ELogMode,
  EPacketID: () => EPacketID,
  MessagePacket: () => MessagePacket,
  Packet: () => Packet,
  PacketHandler: () => PacketHandler,
  PacketManager: () => PacketManager,
  ResourceBase: () => ResourceBase,
  ResourceManager: () => ResourceManager,
  SerializableData: () => SerializableData,
  Vector: () => Vector,
  VectorPacket: () => VectorPacket,
  decodeUTF16LE: () => decodeUTF16LE,
  decodeUTF8: () => decodeUTF8,
  encodeUTF16LE: () => encodeUTF16LE,
  encodeUTF8: () => encodeUTF8,
  getBytesHeaderSize: () => getBytesHeaderSize,
  getFlexiableUTF16LESize: () => getFlexiableUTF16LESize,
  getFlexiableUTF8Size: () => getFlexiableUTF8Size,
  logger: () => logger,
  parseToBoolean: () => parseToBoolean,
  parseToFloat: () => parseToFloat,
  parseToInteger: () => parseToInteger
});
module.exports = __toCommonJS(BundleIndex_exports);

// AlkkagiShared/Data/Resource/DataParseHelper.js
function parseToFloat(v) {
  if (v === null || v === void 0)
    return null;
  const s = String(v).trim().replace(",", ".");
  const n = Number.parseFloat(s);
  return Number.isFinite(n) ? n : null;
}
function parseToInteger(v) {
  if (v === null || v === void 0)
    return null;
  const n = Number.parseInt(String(v).trim(), 10);
  return Number.isFinite(n) ? n : null;
}
function parseToBoolean(v) {
  if (v === null || v === void 0)
    return null;
  const s = String(v).trim().toLowerCase();
  if (s === "true" || s === "1")
    return true;
  if (s === "false" || s === "0")
    return false;
  return null;
}

// AlkkagiShared/Data/Resource/ResourceBase.js
var ResourceBase = class {
  constructor() {
    this.id = 0;
    this.name = "";
    this.dict = {};
  }
  init(id, dict) {
    this.id = id;
    this.dict = dict || {};
    this.name = this.getDictValue("Name", "");
  }
  hasDict(key) {
    return Object.prototype.hasOwnProperty.call(this.dict, key);
  }
  getDictValue(key, defaultValue = "") {
    return this.dict[key];
  }
  getDictValueInt(key, defaultValue = 0) {
    const n = parseToInteger(this.dict[key]);
    return Number.isFinite(n) ? n : defaultValue;
  }
  getDictValueFloat(key, defaultValue = 0) {
    const n = parseToFloat(this.dict[key]);
    return Number.isFinite(n) ? n : defaultValue;
  }
  getDictValueBool(key, defaultValue = false) {
    const b = parseToBoolean(this.dict[key]);
    return b === void 0 || b === null ? defaultValue : Boolean(b);
  }
  getDictValueArray(key, defaultValue = []) {
    const raw = this.dict[key];
    if (raw === void 0 || raw === null) return defaultValue;
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string") {
      try {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) return arr;
      } catch {
      }
      const csv = raw.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
      if (csv.length > 0) return csv;
    }
    return defaultValue;
  }
  static _ensureStore() {
    if (!Object.prototype.hasOwnProperty.call(this, "items")) {
      Object.defineProperty(this, "items", {
        value: /* @__PURE__ */ new Map(),
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  }
  static get(id) {
    this._ensureStore();
    return this.items.get(id);
  }
  static getWhere(pred) {
    this._ensureStore();
    const out = [];
    for (const v of this.items.values()) {
      if (!pred || pred(v)) out.push(v);
    }
    return out;
  }
  static async load(fileName, clear = true) {
    const ctor = this;
    ctor._ensureStore();
    const baseDir = "../../../AlkkagiData";
    const path = await import("node:path");
    const fs = await import("node:fs/promises");
    const fss = await import("node:fs");
    const p = path.resolve(baseDir, fileName);
    if (!fss.existsSync(p)) {
      console.log(`[${ctor.name}] File not found: ${p}`);
      return;
    }
    let text;
    try {
      text = await fs.readFile(p, "utf8");
    } catch (e) {
      console.log(`[${ctor.name}] File read error: ${p}`);
      return;
    }
    let root;
    try {
      const norm = text.charCodeAt(0) === 65279 ? text.slice(1) : text;
      root = JSON.parse(norm);
    } catch {
      console.log(`[${ctor.name}] JSON parse error: ${fileName}`);
      return;
    }
    if (clear) ctor.items.clear();
    for (const idStr in root) {
      if (!Object.prototype.hasOwnProperty.call(root, idStr)) continue;
      const id = Number.parseInt(idStr, 10);
      if (!Number.isFinite(id)) continue;
      const value = root[idStr];
      let dict = value;
      if (typeof value === "string") {
        try {
          dict = JSON.parse(value);
        } catch {
          console.log(`[${ctor.name}] Skip id=${id} (inner JSON parse error)`);
          continue;
        }
      }
      if (!dict || typeof dict !== "object") {
        console.log(`[${ctor.name}] Skip id=${id} (value is not an object)`);
        continue;
      }
      const item = new ctor();
      item.init(id, dict);
      ctor.items.set(id, item);
    }
    console.log(`[${ctor.name}] Loaded ${ctor.items.size} items from ${path.relative(baseDir, p)}.`);
  }
};

// AlkkagiShared/Data/Resource/ResourceManager.js
var ResourceManager = class {
  constructor() {
    this.loaded = false;
  }
  load(force = false) {
    if (this.loaded && !force)
      return;
    this.loaded = true;
  }
};

// AlkkagiShared/modules/encodingutility.js
function encodeUTF8(str) {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(str);
  }
  const out = [];
  for (let i = 0; i < str.length; i++) {
    let cp = str.charCodeAt(i);
    if (cp >= 55296 && cp <= 56319 && i + 1 < str.length) {
      const low = str.charCodeAt(i + 1);
      if (low >= 56320 && low <= 57343) {
        cp = 65536 + (cp - 55296 << 10) + (low - 56320);
        i++;
      }
    }
    if (cp <= 127) {
      out.push(cp);
    } else if (cp <= 2047) {
      out.push(192 | cp >> 6, 128 | cp & 63);
    } else if (cp <= 65535) {
      out.push(
        224 | cp >> 12,
        128 | cp >> 6 & 63,
        128 | cp & 63
      );
    } else {
      out.push(
        240 | cp >> 18,
        128 | cp >> 12 & 63,
        128 | cp >> 6 & 63,
        128 | cp & 63
      );
    }
  }
  return Uint8Array.from(out);
}
function decodeUTF8(bytes) {
  if (typeof TextDecoder !== "undefined") {
    return new TextDecoder("utf-8").decode(bytes);
  }
  let out = "";
  for (let i = 0; i < bytes.length; ) {
    const b0 = bytes[i++];
    if (b0 < 128) {
      out += String.fromCharCode(b0);
      continue;
    }
    if ((b0 & 224) === 192) {
      const b12 = (bytes[i++] ?? 0) & 63;
      const cp2 = (b0 & 31) << 6 | b12;
      out += String.fromCharCode(cp2);
      continue;
    }
    if ((b0 & 240) === 224) {
      const b12 = (bytes[i++] ?? 0) & 63;
      const b22 = (bytes[i++] ?? 0) & 63;
      const cp2 = (b0 & 15) << 12 | b12 << 6 | b22;
      out += String.fromCharCode(cp2);
      continue;
    }
    const b1 = (bytes[i++] ?? 0) & 63;
    const b2 = (bytes[i++] ?? 0) & 63;
    const b3 = (bytes[i++] ?? 0) & 63;
    const cp = (b0 & 7) << 18 | b1 << 12 | b2 << 6 | b3;
    const high = 55296 + (cp - 65536 >> 10);
    const low = 56320 + (cp - 65536 & 1023);
    out += String.fromCharCode(high, low);
  }
  return out;
}
function encodeUTF16LE(str, withBOM = false) {
  const units = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c >= 55296 && c <= 56319 && i + 1 < str.length) {
      const d = str.charCodeAt(i + 1);
      if (d >= 56320 && d <= 57343) {
        units.push(c, d);
        i++;
        continue;
      }
    }
    units.push(c);
  }
  const extra = withBOM ? 2 : 0;
  const out = new Uint8Array(units.length * 2 + extra);
  let o = 0;
  if (withBOM) {
    out[o++] = 255;
    out[o++] = 254;
  }
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    out[o++] = u & 255;
    out[o++] = u >> 8;
  }
  return out;
}
function decodeUTF16LE(bytes) {
  let o = 0;
  if (bytes.length >= 2 && bytes[0] === 255 && bytes[1] === 254)
    o = 2;
  const CHUNK = 32768;
  const len = bytes.length - o >>> 1;
  let out = "";
  for (let i = 0; i < len; i += CHUNK) {
    const n = Math.min(CHUNK, len - i);
    const arr = new Array(n);
    for (let j = 0; j < n; j++) {
      arr[j] = bytes[o + (i + j << 1)] | bytes[o + (i + j << 1) + 1] << 8;
    }
    out += String.fromCharCode(...arr);
  }
  return out;
}

// AlkkagiShared/modules/bufferhandle.js
var BufferReadHandle = class {
  constructor(buffer) {
    this.buffer = buffer;
    this.view = new DataView(buffer);
    this.offset = 0;
  }
  readUint8() {
    if (this.offset + 1 > this.buffer.byteLength) {
      throw new Error("Error with readUint8: Out of bounds");
    }
    const value = this.view.getUint8(this.offset);
    this.offset += 1;
    return value;
  }
  readUint16() {
    if (this.offset + 2 > this.buffer.byteLength) {
      throw new Error("Error with readUint16: Out of bounds");
    }
    const value = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return value;
  }
  readUint32() {
    if (this.offset + 4 > this.buffer.byteLength) {
      throw new Error("Error with readUint32: Out of bounds");
    }
    const value = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return value;
  }
  readInt8() {
    if (this.offset + 1 > this.buffer.byteLength) {
      throw new Error("Error with readInt8: Out of bounds");
    }
    const value = this.view.getInt8(this.offset);
    this.offset += 1;
    return value;
  }
  readInt16() {
    if (this.offset + 2 > this.buffer.byteLength) {
      throw new Error("Error with readInt16: Out of bounds");
    }
    const value = this.view.getInt16(this.offset, true);
    this.offset += 2;
    return value;
  }
  readInt32() {
    if (this.offset + 4 > this.buffer.byteLength) {
      throw new Error("Error with readInt32: Out of bounds");
    }
    const value = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return value;
  }
  readFloat32() {
    if (this.offset + 4 > this.buffer.byteLength) {
      throw new Error("Error with readFloat32: Out of bounds");
    }
    const value = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return value;
  }
  readFloat64() {
    if (this.offset + 8 > this.buffer.byteLength) {
      throw new Error("Error with readFloat64: Out of bounds");
    }
    const value = this.view.getFloat64(this.offset, true);
    this.offset += 8;
    return value;
  }
  readStringUTF8() {
    const length = this.readUint16();
    if (this.offset + length > this.buffer.byteLength)
      throw new Error("Error with readStringUTF8: Out of bounds");
    const bytes = new Uint8Array(this.buffer, this.offset, length);
    const str = decodeUTF8(bytes);
    this.offset += length;
    return str;
  }
  readStringUTF16LE() {
    const length = this.readUint16();
    if (this.offset + length > this.buffer.byteLength)
      throw new Error("Error with readStringUTF16LE: Out of bounds");
    const bytes = new Uint8Array(this.buffer, this.offset, length);
    const str = decodeUTF16LE(bytes);
    this.offset += length;
    return str;
  }
  readBytes() {
    const bytes = new Uint8Array(this.readArrayBuffer());
    return bytes;
  }
  readArrayBuffer() {
    const length = this.readUint16();
    if (this.offset + length > this.buffer.byteLength)
      throw new Error("Error with readArrayBuffer: Out of bounds");
    const arrayBuffer = this.buffer.slice(this.offset, this.offset + length);
    this.offset += length;
    return arrayBuffer;
  }
};
var BufferWriteHandle = class {
  constructor(buffer) {
    this.buffer = buffer;
    this.view = new DataView(buffer);
    this.offset = 0;
  }
  writeUint8(value) {
    if (this.offset + 1 > this.buffer.byteLength) {
      throw new Error("Error with writeUint8: Out of bounds");
    }
    this.view.setUint8(this.offset, value);
    this.offset += 1;
  }
  writeUint16(value) {
    if (this.offset + 2 > this.buffer.byteLength) {
      throw new Error("Error with writeUint16: Out of bounds");
    }
    this.view.setUint16(this.offset, value, true);
    this.offset += 2;
  }
  writeUint32(value) {
    if (this.offset + 4 > this.buffer.byteLength) {
      throw new Error("Error with writeUint32: Out of bounds");
    }
    this.view.setUint32(this.offset, value, true);
    this.offset += 4;
  }
  writeInt8(value) {
    if (this.offset + 1 > this.buffer.byteLength) {
      throw new Error("Error with writeInt8: Out of bounds");
    }
    this.view.setInt8(this.offset, value);
    this.offset += 1;
  }
  writeInt16(value) {
    if (this.offset + 2 > this.buffer.byteLength) {
      throw new Error("Error with writeInt16: Out of bounds");
    }
    this.view.setInt16(this.offset, value, true);
    this.offset += 2;
  }
  writeInt32(value) {
    if (this.offset + 4 > this.buffer.byteLength) {
      throw new Error("Error with writeInt32: Out of bounds");
    }
    this.view.setInt32(this.offset, value, true);
    this.offset += 4;
  }
  writeFloat32(value) {
    if (this.offset + 4 > this.buffer.byteLength) {
      throw new Error("Error with writeFloat32: Out of bounds");
    }
    this.view.setFloat32(this.offset, value, true);
    this.offset += 4;
  }
  writeFloat64(value) {
    if (this.offset + 8 > this.buffer.byteLength) {
      throw new Error("Error with writeFloat64: Out of bounds");
    }
    this.view.setFloat64(this.offset, value, true);
    this.offset += 8;
  }
  writeStringUTF8(value) {
    const strBuffer = encodeUTF8(value);
    const length = strBuffer.length;
    if (length > 65535)
      throw new Error("Error with writeStringUTF8: Out of bounds");
    if (this.offset + 2 + length > this.buffer.byteLength)
      throw new Error("Error with writeStringUTF8: Out of bounds");
    this.writeUint16(length);
    new Uint8Array(this.buffer, this.offset, length).set(strBuffer);
    this.offset += length;
  }
  writeStringUTF16LE(value) {
    const strBuffer = encodeUTF16LE(value, false);
    const length = strBuffer.length;
    if (length > 65535)
      throw new Error("Error with writeStringUTF16LE: Out of bounds");
    if (this.offset + 2 + length > this.buffer.byteLength)
      throw new Error("Error with writeStringUTF16LE: Out of bounds");
    this.writeUint16(length);
    new Uint8Array(this.buffer, this.offset, length).set(strBuffer);
    this.offset += length;
  }
  writeBytes(bytes) {
    const length = bytes.length;
    if (this.offset + length > this.buffer.byteLength)
      throw new Error("Error with writeBytes: Out of bounds");
    this.writeUint16(length);
    new Uint8Array(this.buffer, this.offset, length).set(bytes);
    this.offset += length;
  }
  writeArrayBuffer(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    this.writeBytes(bytes);
  }
  build() {
    return this.buffer.slice(0, this.offset);
  }
};
function getFlexiableUTF8Size(value) {
  return 2 + value.length * 4;
}
function getFlexiableUTF16LESize(value) {
  return 2 + value.length * 4;
}
function getBytesHeaderSize() {
  return 2;
}

// AlkkagiShared/modules/logger.js
var EColors = {
  ERROR: "\x1B[31m",
  // red
  WARN: "\x1B[33m",
  // yellow
  INFO: "\x1B[36m",
  // turquoise
  DEBUG: "\x1B[90m",
  // gray
  RESET: "\x1B[0m"
  // reset
};
var ELogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};
var ELogMode = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  MASTER: "master"
};
var ELevelOfMode = {
  [ELogMode.DEVELOPMENT]: ELogLevel.DEBUG,
  [ELogMode.PRODUCTION]: ELogLevel.INFO,
  [ELogMode.MASTER]: ELogLevel.ERROR
};
var Logger = class {
  constructor() {
    this.currentLevel = ELevelOfMode[ELogMode.DEVELOPMENT];
  }
  setMode(mode) {
    if (ELevelOfMode.hasOwnProperty(mode) === false)
      return;
    this.currentLevel = ELevelOfMode[mode];
  }
  getTimestamp() {
    return (/* @__PURE__ */ new Date()).toISOString();
  }
  formatMessage(level, category, message) {
    const timestamp = this.getTimestamp();
    const color = EColors[level] || "";
    const reset = EColors.RESET;
    let formattedMessage = `${color}[${timestamp}] [${level}] [${category}] ${message}${reset}`;
    return formattedMessage;
  }
  log(level, category, message) {
    if (ELogLevel[level] > this.currentLevel)
      return;
    console.log(this.formatMessage(level, category, message));
  }
  error(category, message) {
    this.log("ERROR", category, message);
  }
  warn(category, message) {
    this.log("WARN", category, message);
  }
  info(category, message) {
    this.log("INFO", category, message);
  }
  debug(category, message) {
    this.log("DEBUG", category, message);
  }
};
var logger = new Logger();

// AlkkagiShared/modules/serializabledata.js
var SerializableData = class {
  constructor() {
  }
  getFlexiableSize() {
    throw new Error("Abstract method 'getFlexiableSize' must be implemented");
  }
  serialize() {
    const buffer = new ArrayBuffer(this.getFlexiableSize());
    const writeHandle = new BufferWriteHandle(buffer);
    this.onSerialize(writeHandle);
    return writeHandle.build();
  }
  onSerialize(writeHandle) {
    throw new Error("Abstract method 'onSerialize' must be implemented");
  }
  deserialize(data) {
    const readHandle = new BufferReadHandle(data);
    this.onDeserialize(readHandle);
    return this;
  }
  onDeserialize(readHandle) {
    throw new Error("Abstract method 'onDeserialize' must be implemented");
  }
};

// AlkkagiShared/modules/vector.js
var Vector = class _Vector extends SerializableData {
  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
  }
  getFlexiableSize() {
    let size = 0;
    size += 4;
    size += 4;
    return size;
  }
  onSerialize(writeHandle) {
    writeHandle.writeFloat32(this.x);
    writeHandle.writeFloat32(this.y);
  }
  onDeserialize(readHandle) {
    this.x = readHandle.readFloat32();
    this.y = readHandle.readFloat32();
  }
  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  getSqrMagnitude() {
    return this.x * this.x + this.y * this.y;
  }
  getNormalized() {
    const length = this.getMagnitude();
    if (length === 0)
      return new _Vector(0, 0);
    return new _Vector(this.x / length, this.y / length);
  }
  normalize() {
    const length = this.getMagnitude();
    if (length === 0)
      return;
    this.x /= length;
    this.y /= length;
  }
  getAdded(vector) {
    return new _Vector(this.x + vector.x, this.y + vector.y);
  }
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
  getSubtracted(vector) {
    return new _Vector(this.x - vector.x, this.y - vector.y);
  }
  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }
  getMultiplied(value) {
    return new _Vector(this.x * value, this.y * value);
  }
  multiply(value) {
    this.x *= value;
    this.y *= value;
  }
  getDivided(value) {
    return new _Vector(this.x / value, this.y / value);
  }
  divide(value) {
    this.x /= value;
    this.y /= value;
  }
};

// AlkkagiShared/packets/base/packet.js
var Packet = class extends SerializableData {
  constructor() {
    super();
  }
  getPacketID() {
    throw new Error("Abstract method 'getPacketID' must be implemented");
  }
  getFlexiableSize() {
    let size = 0;
    size += 1;
    return size;
  }
  onSerialize(writeHandle) {
    writeHandle.writeUint8(this.getPacketID());
  }
  onDeserialize(readHandle) {
    readHandle.readUint8();
  }
};

// AlkkagiShared/packets/base/packethandler.js
var PacketHandler = class {
  constructor() {
  }
  handle(packet) {
    throw new Error("Abstract method 'handle' must be implemented");
  }
};

// AlkkagiShared/packets/base/packetmanager.js
var PacketManager = class {
  static factories = {};
  static handlers = {};
  static handlerArgs = [];
  constructor() {
    throw new Error("PacketManager is a static class and cannot be instantiated");
  }
  static on(packetID, PacketType, PacketHandlerType) {
    this.factories[packetID] = PacketType;
    this.handlers[packetID] = PacketHandlerType;
  }
  static createPacket(packetID, buffer) {
    const factory = this.factories[packetID];
    if (factory === void 0) {
      throw new Error(`Factory for packetID ${packetID} not found`);
    }
    const packet = new factory();
    packet.deserialize(buffer);
    return packet;
  }
  static createHandler(packetID, ...args) {
    const handler = this.handlers[packetID];
    if (handler === void 0) {
      throw new Error(`Handler for packetID ${packetID} not found`);
    }
    return new handler(...this.handlerArgs, ...args);
  }
  static injectHandlerArgs(...args) {
    this.handlerArgs = args;
  }
};

// AlkkagiShared/packets/epacketid.js
var EPacketID = {
  MESSAGE: 0,
  VECTOR: 1
};

// AlkkagiShared/packets/messagepacket.js
var MessagePacket = class extends Packet {
  constructor(message = "") {
    super();
    this.message = message;
  }
  getPacketID() {
    return EPacketID.MESSAGE;
  }
  getFlexiableSize() {
    let size = super.getFlexiableSize();
    size += getFlexiableUTF8Size(this.message);
    return size;
  }
  onSerialize(writeHandle) {
    super.onSerialize(writeHandle);
    writeHandle.writeStringUTF8(this.message);
  }
  onDeserialize(readHandle) {
    super.onDeserialize(readHandle);
    this.message = readHandle.readStringUTF8();
  }
};

// AlkkagiShared/packets/vectorpacket.js
var VectorPacket = class extends Packet {
  constructor(vector = new Vector()) {
    super();
    this.vector = vector;
  }
  getPacketID() {
    return EPacketID.VECTOR;
  }
  getFlexiableSize() {
    let size = super.getFlexiableSize();
    size += this.vector.getFlexiableSize() + getBytesHeaderSize();
    return size;
  }
  onSerialize(writeHandle) {
    super.onSerialize(writeHandle);
    writeHandle.writeArrayBuffer(this.vector.serialize());
  }
  onDeserialize(readHandle) {
    super.onDeserialize(readHandle);
    this.vector = new Vector().deserialize(readHandle.readArrayBuffer());
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BufferReadHandle,
  BufferWriteHandle,
  ELogLevel,
  ELogMode,
  EPacketID,
  MessagePacket,
  Packet,
  PacketHandler,
  PacketManager,
  ResourceBase,
  ResourceManager,
  SerializableData,
  Vector,
  VectorPacket,
  decodeUTF16LE,
  decodeUTF8,
  encodeUTF16LE,
  encodeUTF8,
  getBytesHeaderSize,
  getFlexiableUTF16LESize,
  getFlexiableUTF8Size,
  logger,
  parseToBoolean,
  parseToFloat,
  parseToInteger
});
//# sourceMappingURL=SharedBundle.cjs.map
