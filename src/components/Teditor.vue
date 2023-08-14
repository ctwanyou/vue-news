<script setup>
import { ref, reactive, onMounted } from 'vue'
import { tinyMceUpFile } from '@/apis/tinymceUpAPI'
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme' // 主题文件
import 'tinymce/icons/default'
import 'tinymce/models/dom'
// tinymce插件可按自己的需要进行导入
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image' // 插入上传图片插件
//import 'tinymce/plugins/media' // 插入上传图片插件
import "tinymce/plugins/importcss"; //图片工具
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import "tinymce/plugins/charmap"; // 特殊字符
import 'tinymce/plugins/wordcount' // 字数统计插件
import "tinymce/plugins/codesample"; // 插入代码
import "tinymce/plugins/code"; // 查看源码
import "tinymce/plugins/fullscreen"; //全屏
import 'tinymce/plugins/link' //
import 'tinymce/plugins/preview' // 预览
import "tinymce/plugins/template"; //插入模板
import 'tinymce/plugins/save' // 保存
import "tinymce/plugins/searchreplace"; //查询替换
import "tinymce/plugins/pagebreak"; //分页
import "tinymce/plugins/insertdatetime"; //时间插入
//import "tinymce/plugins/help"; //帮助visualchars
import "tinymce/plugins/visualchars";//显示不可见字符visualblocks
import "tinymce/plugins/visualblocks";//显示区块边框spellchecker  axupimgs
//导入多图上传和首行缩进二字符

//子传父
const emits = defineEmits(['getContent']);
//参数父传子
const props = defineProps({
    content: {
        type: String,
        default: () => {
            return '';
        },
    },
    readonly: {
        type: Boolean,
        default: true,
    },
});
const init = reactive({
    selector: 'textarea',
    width: 1000,
    height: 900,
    language_url: '/tinymce/langs/zh-Hans.js',
    language: 'zh-Hans',
    // 皮肤：这里引入的是public下的资源文件
    skin_url: '/tinymce/skins/ui/oxide',
    // skin_url: 'tinymce/skins/ui/oxide-dark',//黑色系
    placeholder: '文章内容...',
    // plugins: this.plugins,
    // toolbar: this.toolbar,

    content_css: '/tinymce/skins/content/default/content.css',
    //可以设置的字体大小
    font_size_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
    //设置可供选择的字例
    font_family_formats: "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
    paste_data_images: true,  //图片是否可粘贴
    branding: false,
    //需要导入的插件
    plugins: 'lists image media table wordcount save preview code help visualchars visualblocks link insertdatetime pagebreak searchreplace axupimgs indent2em importword',
    toolbar:
        'fontfamily fontsize forecolor backcolor removeformat indent2em formatselect undo redo copy cut paste print  wordcount ltr rtl visualchars visualblocks toc spellchecker searchreplace nonbreaking link media image axupimgs outdent indent aligncenter alignleft alignright alignjustify lineheight  underline bold italic  strikethrough h1 h2 h3 blockquote numlist bullist table hr charmap insertdatetime subscript superscript codesample code preview importword',
    menubar: true,
    menu: {
        file: { title: 'File', items: 'newdocument restoredraft save | preview | importword | export print' },
        edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
        view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
        insert: { title: 'Insert', items: 'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
        format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
        tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
        table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' }
        // help: { title: 'Help', items: 'help' }
    },
    // 是否显示底部状态栏
    statusbar: true,
    paste_webkit_styles: "all",
    paste_merge_formats: true,
    nonbreaking_force_tab: false,
    paste_auto_cleanup_on_paste: false,
    file_picker_types: "file image media",
    image_uploadtab: true,
    // 文件上传 有此配置，链接、图片、视频才会出现上传按钮
    file_picker_callback: (callback, value, meta) => {
        //,,m4v,avi,wmv,rmvb,mov,mpg,mpeg,webm
        let filetype =
            ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4,.mkv, .avi,.wmv, .rmvb,.mov,.mpg,.mpeg,.webm, .jpg, .jpeg, .png, .gif"; //限制文件的上传类型
        let inputElem = document.createElement("input"); //创建文件选择
        inputElem.setAttribute("type", "file");
        inputElem.setAttribute("accept", filetype);
        inputElem.click();
        inputElem.onchange = () => {
            let upurl = "";
            let file = inputElem.files[0]; //获取文件信息
            // const ph = import.meta.env.VITE_APP_IMAGE_URL;
            let params = new FormData();
            let type=0
            upurl = "Files/UpFile";
            params.append("file", file);
            if (file.type.slice(0, 5) == "video") {
                //判断文件类型

                params.append("type", '3');
            } else if (file.type.slice(0, 5) == "image") {
                params.append("type", '1');
            } else {
                params.append("type", '2');
                type=2
            }
            if (file.type.slice(0, 5) == "image" && file.size / 1024 / 1024 > 2) {
                alert("上传失败，图片大小请控制在2M以内");
            } else if (file.type.slice(0, 5) == "video" && file.size / 1024 / 1024 > 500) {
                alert("上传失败，视频大小请控制在 500M 以内");
            } else if (type == 2 && file.size / 1024 / 1024 > 100) {
                alert("上传失败，文件大小请控制在 10M 以内");
            } else {
                // let config = {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     },
                // };
                tinyMceUpFile(upurl, params)
                    .then((res) => {
                        if (res.status == 200) {
                            console.log(res);
                            if (res.data.url) {
                                callback(res.data.url, {  //callback(ph + res.data.url, {
                                    text: res.data.alt,
                                    title: res.data.alt,
                                });
                            } else {
                                console.log(res);
                                //上传成功，在回调函数里填入文件路径
                                //没有用到这个回调
                               // callback(ph + res.data);
                            }
                        } else {
                            console.log(res);
                            alert("上传失败");
                        }
                    })
                    .catch(() => {
                        alert("上传出错，服务器开小差了呢");
                    });

                // request
                //     .post(upurl, params, config)
                //     .then((res) => {
                //         if (res.code == 200) {
                //             if (res.data.url) {
                //                 callback(res.data.url, {  //callback(ph + res.data.url, {
                //                     text: res.data.alt,
                //                     title: res.data.name,
                //                 });
                //             } else {
                //                 console.log(res);
                //                 //上传成功，在回调函数里填入文件路径
                //                 callback(ph + res.data);
                //             }
                //         } else {
                //             alert("上传失败");
                //         }
                //     })
                //     .catch(() => {
                //         alert("上传出错，服务器开小差了呢");
                //     });
            }
        };
    },

    //图像上传
    images_upload_handler(blobInfo, progress) {
        return new Promise((resolve, reject) => {
            if (blobInfo.blob().size / 1024 / 1024 > 10) {
                reject("上传失败，图片大小请控制在 10M 以内")
            } else {
                let params = new FormData()
                params.append('file', blobInfo.blob())
                params.append("type", '1');
                tinyMceUpFile('Files/UpFile', params).then(res => {
                    if (res.status == 200) {
                        // console.log(picUrl + res.result, '上传成功')
                        // success(picUrl + res.result)  //上传成功，在成功函数里填入图片路径
                        // resolve('data:' + blobInfo.blob().type + ';base64,' + blobInfo.base64())
                        resolve(res.data.url)
                    } else {
                        reject("上传失败")
                    }
                }).catch(() => {
                    reject("上传出错，服务器开小差了呢")
                })
            }
        })
    },

    // convert_urls: false,
    // 初始化完成
    init_instance_callback: (editor) => {
        console.log("初始化完成：", editor)
    },
})
const textContent = ref(props.content)
const getContents = () => {
    if (textContent.value) return textContent.value;
    return '';
};
//在onMounted中初始化编辑器
onMounted(() => {
    tinymce.init({});
});
//将方法外露给父组件
defineExpose({
    getContents,
});
</script>
<template>
    <div class="timymce-box">
        <editor v-model="textContent" :init="init" :disabled="disabled" @onClick="onClick"></editor>
    </div>
</template>
<style scoped>
.tinymce-box {
    margin: 20px;
}
</style>