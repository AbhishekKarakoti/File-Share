let fileInput, message,perBox,test;

function init() {
    fileInput = document.getElementById('file-input');
    message = document.getElementById('message');
    perBox = document.getElementById('perc');
    Box = document.getElementsByClassName('box')[0];
    test=document.getElementById('test');
    
    
    
    fileInput.addEventListener('change', function () {
        let xhr = new XMLHttpRequest(),
            fd = new FormData();

        fd.append('myfile', fileInput.files[0]);

        xhr.upload.onloadstart = function (e) {
            Box.classList.add('visible');
            test.classList.add('visible');
            message.textContent = 'uploading...';
            fileInput.disabled = true;
        };

        xhr.upload.onprogress = function (e) {
              
              let perc=(e.loaded/e.total)*100;
              perc=perc.toFixed(2);
              perBox.textContent=perc;
              test.style.width=parseInt(perc)+'px';
               
            };
            
            xhr.upload.onloadend = function (e) {
                test.classList.add('hidden');
                perBox.classList.add('hidden');
                Box.classList.remove('visible');
                message.textContent = 'complete!';
                fileInput.disabled = false;
            };

            xhr.onload = function () {
                const link=JSON.parse(xhr.responseText);
                message.textContent = `Your file is `;
                let a=document.createElement('a');
                a.setAttribute('href',link.file);
                a.setAttribute('target','_blank');
                a.innerText=`${link.file}`;
                a.classList.add('font-weight-bold')
                message.appendChild(a);
                fileInput.disabled=true;
            };
        
        xhr.open('POST', '/api/files/upload', true);
        xhr.send(fd);
    });
}

init();