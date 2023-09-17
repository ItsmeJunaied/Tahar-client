import React from 'react';

const UploadProductsPro = () => {
    return (
        <div>
            <form method='post' encType='multipart/form-data'>
                <input type="file" name='images' className="file-input file-input-bordered file-input-primary w-full max-w-xs" />

            </form>
        </div>
    );
};

export default UploadProductsPro;