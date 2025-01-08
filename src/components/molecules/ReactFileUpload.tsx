import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { downloadXLSX } from '../../helpers/downloadXLSX';

interface ReactFileUploadProps {
  uploadType: 'shirt' | 'pants' | null; 
}

export default function ReactFileUpload({ uploadType }: ReactFileUploadProps) {
  const toast = useRef<Toast>(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        let _totalSize = totalSize;
        let files = e.files;

        for (let i = 0; i < files.length; i++) {
            _totalSize += files[i].size || 0;
        }

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e: FileUploadUploadEvent) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file: File, callback: Function) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const handleDownloadTemplate = () => {
      let headers: string[] = [];
      let data: any[] = [];
      let fileName = "";
  
      if (uploadType === "shirt") {
        headers = [
          "RFID No",
          "Belongs To",
          "Uniform Type",
          "Gender",
          "Shoulder Length",
          "Sleeve",
          "Collar Length",
          "Row",
          "Rack",
        ];
        data = [
          [
            "RFID005",
            "Army",
            "Combat",
            "Male",
            50,
            67,
            43,
            "F5",
            "F",
          ],
        ];
        fileName = "Shirt_Template";
      } else if (uploadType === "pants") {
        headers = [
          "RFID No",
          "Belongs To",
          "Uniform Type",
          "Gender",
          "Waist",
          "Length",
          "Row",
          "Rack",
        ];
        data = [
          [
            "RFID013",
            "Air Force",
            "No. 1",
            "Male",
            36,
            110,
            "C6",
            "C",
          ],
        ];
        fileName = "Pants_Template";
      }
  
      downloadXLSX(headers, data, fileName);
    };
  


    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
      const { className, chooseButton, uploadButton, cancelButton } = options;
      const value = totalSize / 10000;
      const formatedValue =
        fileUploadRef && fileUploadRef.current
          ? fileUploadRef.current.formatSize(totalSize)
          : "0 B";

      const downloadButton = (
        <Button
          icon="pi pi-download"
          className="p-button-rounded p-button-info p-button-outlined"
          onClick={handleDownloadTemplate}
        />
      );

      return (
        <div
          className={className}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
          }}
        >
          {chooseButton}
          {uploadButton}
          {cancelButton}
          {downloadButton}


          <div className="flex items-center gap-3 ml-auto">
            <span>{formatedValue} / 1 MB</span>
            <ProgressBar
              value={value}
              showValue={false}
              style={{ width: "10rem", height: "12px" }}
            ></ProgressBar>
          </div>
        </div>
      );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
      const file = inFile as File;
      // const fileURL = URL.createObjectURL(file);  
      return (
          <div className="flex align-items-center flex-wrap">
              <div className="flex items-center" style={{ width: '40%' }}>
                  {/* <img alt={file.name} role="presentation" src={fileURL} width={100} /> */}
                  <span className="flex flex-column text-left ml-3">
                      {file.name}
                      {/* <small>{new Date().toLocaleDateString()}</small> */}
                  </span>
              </div>
              <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
              <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
          </div>
      );
  };
  

    const emptyTemplate = () => {
        return (
            <div className="flex items-center flex-col">
                <i className="pi pi-file-import mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop XlSX File Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-file-excel', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return (
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
            <Tooltip target=".p-button-info" content="Download Template" position="bottom" />


            <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
        </div>
    );
}
