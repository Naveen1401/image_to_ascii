let input;

let org_height;
let org_width;
let new_height;

const getFile = (file) => {
    input = file.files[0];
    console.log(input)
    setAscii();
    const blobURL = URL.createObjectURL(input);
    const img = new Image();
    img.src = blobURL;
    img.onload = function () {
        URL.revokeObjectURL(this.src);
        org_height = img.height;
        org_width = img.width;

        new_height = (800 * org_height) / org_width;

        document.getElementById("slider").style.height = `${new_height}px`;
        document.getElementById("sliderInput").style.marginTop = `${new_height}px`;
    };
}

let font_ = 0;

const font1 = ()=>{
    font_ = 0;
    setAscii();
}
const font2 = ()=>{
    font_ = 1;
    setAscii();
}
const font3 = ()=>{
    font_ = 2;
    setAscii();
}

function setAscii() {

    var reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function () {
        document.getElementById("preview").src = reader.result;
        document.getElementById("preview").style.width = "800px";
        let ele = new imgToAscii(reader.result, 0.3,`${font_}`);
        ele.display();
        var pre = document.querySelector("pre");
        
        console.log(pre);
        console.log("outsideh2c")

        // document.querySelector("#demo").appendChild(pre);
        var observer = new MutationObserver(function (hello) {
            hello.forEach(function(hello){
                // if(hello.innerText === 'pre'){
                    console.log(hello)
                    html2canvas(pre, {
                        onrendered: function (canvas) {
                            var url = canvas.toDataURL();
                            var image = new Image();
                            image.src = url;
                            document.getElementById("art").src = url;
                            document.getElementById("art").style.width = "800px";
                            document.getElementById("art").style.height = `${new_height}px`;
                            console.log(url);
                            // pre.style.display = "none";
                            document.getElementById("actualArt").appendChild(pre);
                            image.onload = function () {
                                var canvas = document.createElement("canvas");
                                var ctx = canvas.getContext("2d");
                                canvas.width = image.width;
                                canvas.height = image.height;
                                ctx.fillStyle = "white";
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(image, 0, 0);
                                var url2 = canvas.toDataURL();
                                console.log("Hiiiiiii")
                                // document.getElementById("demo").style.display = "none";
                                // document.getElementById("downloadButton").onclick = function () {
                                //     var a = document.createElement("a");
                                //     a.href = url2;
                                //     a.download = "Safeimagekit-" + file_name;
                                //     document.body.appendChild(a);
                                //     a.click();
                                //     if (lang === "en") {
                                //         window.location.href = `/download?tool=${pageTool}`;
                                //     } else {
                                //         window.location.href = `/${lang}/download?tool=${tool}`;
                                //     }
                                // };
                            };
                        },
                    });
                // }
            })
            
        });

        observer.observe(pre, {
            childList: true,
            characterData: this
        });
    };
}

const changeWidth = (val) => {
    let temp = parseInt(val);
    document.getElementById("bottom").style.width = `${temp}%`
    // console.log(val);
}