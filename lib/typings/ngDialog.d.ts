/// <reference path="angularjs/angular.d.ts" />

///////////////////////////////////////////////////////////////////////////////
// ngDialog module (ngDialog.js)
///////////////////////////////////////////////////////////////////////////////
declare module angular.ngDialog {

	interface INGDialogOptions{
		template?: string,
		templateUrl? : string,
		plain? : boolean,
		controllerAs?: string,
		className?: string
	}

	interface INGDialogReturnObject{
		id: string,
		close : (value? : any) => angular.IPromise<any>,
		closePromise : angular.IPromise<any>
	}

    interface INGDialogService {
        open(options : INGDialogOptions) : INGDialogReturnObject;
		isOpen(id? : string);
		close(id?: string, value? : angular.IPromise<any>) : void;
		closeAll(value? : angular.IPromise<any>) : void;
    }

}
