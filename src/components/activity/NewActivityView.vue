<template>
    <el-scrollbar style="margin-right: 1px">
        <el-form
            :model="model"
            :rules="rules"
            label-width="120px"
            ref="activeForm"
            style="margin-right: 20px">
            <el-form-item prop="title" label="活动标题">
                <el-input placeholder="请输入文字" v-model="model.title" />
            </el-form-item>
            <el-form-item label="标题颜色">
                <el-color-picker v-model="model.titleColor" />
            </el-form-item>
            <el-form-item prop="logo" label="活动LOGO">
                <el-upload
                    class="avatar-uploader"
                    action="#"
                    :limit="1"
                    :accept="accpetance"
                    :on-change="logoUpload"
                    :on-remove="logoRemove"
                    :auto-upload="false"
                    list-type="picture-card">
                    <el-icon id="logoUpload" class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="活动背景">
                <el-upload
                    class="avatar-uploader"
                    action="#"
                    :limit="1"
                    :accept="accpetance"
                    :on-change="backgroundUpload"
                    :on-remove="backgroundRemove"
                    :auto-upload="false"
                    list-type="picture-card">
                    <el-icon id="backgroundUpload" class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传照片墙">
                <template #label>
                    <el-popover
                        placement="left"
                        :width="'auto'"
                        trigger="hover">
                        <template #reference>
                            <label
                                style="user-select: auto; pointer-events: all"
                                >上传照片墙</label
                            >
                        </template>
                        <el-button
                            id="PopRemoveAll"
                            @click="
                                () => {
                                    this.$refs.pictureWall.clearFiles();
                                    model.pictures = [];
                                }
                            "
                            type="danger"
                            >清空</el-button
                        >
                    </el-popover>
                </template>
               
                <el-popover placement="right" trigger="click">
                    <template #reference>
                        <el-button
                            ref="cleanRef"
                            style="padding: 0; border: none">
                            <img
                                style="width: 30px; height: 30px"
                                src="../../assets/Main/NewActivity/UploadFile.svg" />
                        </el-button>
                    </template>
                    <el-upload
                        style="max-width: 440px"
                        ref="pictureWall"
                        multiple
                        action="#"
                        :auto-upload="false"
                        :accept="accpetance"
                        :on-change="pictureUpload"
                        :on-remove="pictureRemove"
                        list-type="picture-card">
                        <el-icon class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-popover>
              
            </el-form-item>
            <el-form-item label="照片滚动速度">
                <el-radio-group v-model="model.pictureSpeed">
                    <el-radio
                        v-for="item in speeds"
                        :key="item"
                        :label="item"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="签名滚动速度">
                <el-radio-group v-model="model.signSpeed">
                    <el-radio
                        v-for="item in speeds"
                        :key="item"
                        :label="item"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="签名滚动效果">
                <el-popover placement="right" :width="400" trigger="click">
                    <template #reference>
                        <el-button style="padding: 0; border: none">
                            <img
                                style="width: 30px; height: 30px"
                                src="../../assets/Main/NewActivity/RowEffect.svg" />
                        </el-button>
                    </template>
                    <el-select
                        v-model="model.rollEffect"
                        placeholder="选择效果">
                        <el-option
                            v-for="item in effects"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                        </el-option>
                    </el-select>
                </el-popover>
                <el-radio-group> </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">预览</el-button>
                <el-button type="primary" @click="submitForm">创建</el-button>
            </el-form-item>
        </el-form>
    </el-scrollbar>
</template>

<script>
import { Activity } from "@/utils/Activity";
import { EffectLabel, Effects } from "@/utils/Animation";
import Request from "@/utils/Request";
import "default-passive-events";
export default {
    data() {
        
        return {
            accpetance: "image/png,image/jpg,image/jpeg",
            speeds: ["1x", "2x", "3x"],
            effects: EffectLabel.getList(),
            model: new Activity(),
            rules: Activity.rules(),
        };
    },
    methods: {
        logoUpload(file) {
            this.model.logo = file.raw;
            document.getElementById("logoUpload").parentElement.style.display =
                "none";
        },
        logoRemove() {
            this.model.logo = null;
            document.getElementById("logoUpload").parentElement.style.display =
                "";
        },
        pictureUpload(file) {
            this.model.pictures.push(file.raw);
        },
        pictureRemove(file) {
            let index = this.model.pictures.findIndex(
                (x) => x.uid == file.raw.uid
            );
            this.model.pictures.splice(index, 1);
        },
        backgroundUpload(file) {
            this.model.background = file.raw;
            document.getElementById(
                "backgroundUpload"
            ).parentElement.style.display = "none";
        },
        backgroundRemove() {
            this.model.background = null;
            document.getElementById(
                "backgroundUpload"
            ).parentElement.style.display = "";
        },
        submitForm() {
            console.log(this.model);
            Request.post("/Picture/CreateActivity", this.model.getFileForm(), {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                params: this.model.getDataQuery(),
            })
                .then((t) => console.log(t))
                .catch((e) => console.log(e));
        },
    },
};
</script>

<style>
.el-form-item {
    margin-top: 20px !important;
}

.el-upload-list--picture-card {
    --el-upload-list-picture-card-size: 100px !important;
}

.el-upload--picture-card {
    --el-upload-picture-card-size: 100px !important;
}

.el-popover.el-popper {
    min-width: 50px !important;
}
</style>
