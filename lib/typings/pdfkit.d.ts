declare module org.pdfkit {
	export class BlobStream implements NodeJS.WritableStream {
		writable:boolean;

		addListener(event: string, listener: Function): BlobStream;
		on(event: string, listener: Function): BlobStream;
		once(event: string, listener: Function): BlobStream;
		removeListener(event: string, listener: Function): BlobStream;
		removeAllListeners(event?: string): BlobStream;
		setMaxListeners(n: number): BlobStream;
		getMaxListeners(): number;
		listeners(event: string): Function[];
		emit(event: string, ...args: any[]): boolean;
		listenerCount(type: string): number;

		write(buffer: Buffer|string, cb?: Function): boolean;
		write(str: string, encoding?: string, cb?: Function): boolean;
		end(): void;
		end(buffer: Buffer, cb?: Function): void;
		end(str: string, cb?: Function): void;
		end(str: string, encoding?: string, cb?: Function): void;

		toBlob(mimeType?:string):Blob;
		toBlobURL(mimeType?:string):string;
	}

	export interface PDFDocumentConstructorArguments {
		autoFirstPage?:boolean;
		compress?:boolean;

		layout?:string;
		size?:number[]|string;
		info?: {
			Producer?:string;
			Creator?:string;
			CreationDate?:Date;
		}
	}

	export class PDFDocument {
		constructor(options:PDFDocumentConstructorArguments);
		image(imageData:string, x: number, y: number, options?:any):void;
		end():void;
		pipe(stream:BlobStream):BlobStream;
	}
}
