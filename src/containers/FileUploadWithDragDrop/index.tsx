import { useState, useEffect } from 'react';
import FileUpload from '../../components/FileUpload';
import useStyles from './styles';
import { FileDrop } from 'react-file-drop';

const FileUploadWithDragDrop = (props: {
  fileData: any;
  handleChange: (file: any) => void;
  handleDelete: () => void;
}): JSX.Element => {
  const classes = useStyles();
  const { handleChange, fileData, handleDelete } = props;
  const [companyLogoFile, setCompanyLogoFile] = useState([]) as any;

  useEffect(() => {
    let curList = [] as any;
    if (Object.keys(fileData.companyLogo).length > 0)
      curList = [...fileData.companyLogo];
    setCompanyLogoFile(curList);
  }, [fileData.companyLogo]);

  return (
    <div style={{ margin: '27px' }}>
      {/* <p style={{ textAlign: 'left', opacity: '0.9' }}>
        Logo of your firm in SVG/ PNG/ JPG format in SQUARE SHAPE at least (200 px
        x 200 px) <span style={{ color: 'red' }}>*</span>
      </p> */}
      <p className={`${classes.extensionText} ${classes.textOpacity}`}>
        Image should be in SVG/ PNG/ JPG/ JPEG format
      </p>
      <div className={classes.imageUploadContainer}>
        <FileDrop onDrop={(files) => handleChange(files)}>
          <div style={{ marginTop: '15px' }}>
            <FileUpload
              buttonText={"Select a File..."}
              fileDataList={companyLogoFile}
              handleChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(evt.target?.files)
              }
              handleDelete={() => handleDelete()}
            />
          </div>
          <p className={classes.textOpacity}>or drag and drop a file here</p>
        </FileDrop>
      </div>
    </div>
  );
};

export default FileUploadWithDragDrop;
