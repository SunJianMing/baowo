<template>
  <el-upload
    :action="wtBaseApi + '/modules/authFile/uploadFile'"
    :before-upload="handleBeforeUpload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceed"
    list-type="picture-card"
    :limit="wtLimit"
    :accept="wtFileAccept"
    :file-list="wtFileList">
    <i class="el-icon-plus"></i>
    <div slot="tip" class="el-upload__tip">{{wtTipText}}</div>
  </el-upload>
</template>

<script>
  import request from '@/utils/request'
  import SparkMD5 from 'spark-md5'
  export default {
    name: 'WtImageUpload',
    props: {
      initFileList: {
        type: Array,
        default() {
          return []
        }
      },
      limit: {
        type: Number,
        default() {
          return 100
        }
      },
      fileSizeM: {
        type: Number,
        default() {
          return 1
        }
      },
      fileAccept: {
        type: String,
        default() {
          return '*'
        }
      },
      tipText: {
        type: String,
        default() {
          return ''
        }
      },
      onPreview: Function
    },
    data() {
      return {
        wtBaseApi: process.env.BASE_API,
        wtBaseFileServer: process.env.FILE_SERVER_URL,
        wtFileList: this.initFileList,
        wtLimit: this.limit,
        wtSizeLimit: this.fileSizeM,
        wtFileAccept: this.fileAccept,
        wtTipText: this.tipText,
        wtOnPreview: this.onPreview
      }
    },
    methods: {
      handleBeforeUpload(file) {
        const fileSize = file.size / 1024.0 / 1024.0
        if (this.wtSizeLimit < fileSize) {
          this.$message.warning('超过上传文件大小限制')
          return false
        }
        const that = this
        return new Promise((resolve, reject) => {
          that.getFileMd5(file, (file, result) => {
            if (result.resultCode === 'SUCCESS') {
              //  获取文件md5成功，检查文件在云端是否已上传
              that.requestCheckFile(result.fileMd5, resolve, reject)
            } else {
              //  获取文件md5失败，提示用户发生错误
              reject()
            }
          })
        })
      },
      handleRemove(file, fileList) {
        if (file != null && file.status === 'success') {
          this.wtFileList = fileList
        }
      },
      handleSuccess(response, file, fileList) {
        if (response != null && response.code === '0' && response.data != null && response.data.fileUrl != null) {
          this.wtFileList.push(this.createFileItem(response.data.fileName, response.data.fileUrl))
        } else if (response != null) {
          this.$message.warning('上传失败，请稍候再试')
        } else {
          this.$message.warning('上传失败，请稍候再试')
        }
      },
      handleError(err, file, fileList) {
        console.log('error', err)
      },
      handlePreview(file) {
        if (this.wtOnPreview) {
          this.wtOnPreview(this, file)
        }
      },
      handleExceed(files, fileList) {
        this.$message.warning('超过上传数量限制')
      },
      createFileItem(fileName, fileUrl) {
        return { name: fileName, url: this.wtBaseFileServer + '/' + fileUrl, fileUrl: fileUrl }
      },
      getFileMd5(file, callback) {
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
        const chunkSize = 2097152
        const chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()

        fileReader.onload = function(e) {
          spark.append(e.target.result)
          currentChunk++
          if (currentChunk < chunks) {
            loadNext()
          } else {
            const fileMd5 = spark.end()
            callback(file, { resultCode: 'SUCCESS', fileMd5: fileMd5 })
          }
        }

        fileReader.onerror = function(err) {
          callback(file, { resultCode: 'FAIL', msg: err })
        }

        function loadNext() {
          const start = currentChunk * chunkSize
          const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }

        loadNext()
      },
      //  网络获取文件是否已上传，如果已经上传，直接使用
      requestCheckFile(fileMd5, resolve, reject) {
        request({
          url: '/modules/authFile/checkFile',
          method: 'post',
          data: { fileMd5: fileMd5 }
        }).then(resp => {
          if (resp.code === '0' && resp.data != null && resp.data.fileUrl != null && resp.data.fileUrl !== undefined) {
            reject()
            this.wtFileList.push(this.createFileItem(resp.data.fileName, resp.data.fileUrl))
          } else if (resp.code === '0') {
            resolve()
          } else {
            this.$message.warning('检查文件失败,请稍候再试')
            reject()
          }
        }).catch(() => {
          reject()
        })
      },
      //  外部方法
      getFiles() {
        return this.wtFileList
      }
    }
  }
</script>

<style scoped>

</style>
