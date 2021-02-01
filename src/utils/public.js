import { upload } from '@/api/public'
// import { getToken } from '@/utils/cookies'
import lrz from 'lrz'

export default class myPublic {
  static fileUpload(file, imgUrl) {
    return new Promise((resolve, reject) => {
      const uploadImg = {
        id: new Date().getTime(),
        url: require('@/assets/load.gif'),
        postUrl: '',
        isDelete: false,
        isSuccess: false
      }
      imgUrl.push(uploadImg)
      const index = imgUrl.length - 1
      let FormDatas = new FormData()
      FormDatas.append('file', file.file)
      if (file.file.size < 10485760) {
        if (file.file.size >= 2097152) {
          const item = this.compressImg(file.file)
          FormDatas = item.formData
        }
        upload(FormDatas).then((res) => {
          if (res.code === 1) {
            imgUrl[index].url = res.data.fileurl_str
            imgUrl[index].postUrl = res.data.fileurl
            imgUrl[index].isSuccess = true
          } else {
            imgUrl[index].isSuccess = false
          }
          resolve(imgUrl)
        })
      } else {
        this.$toast.fail('图片大于10mb请重新上传')
      }
    })
  }

  // 图片压缩
  static compressImg(file) {
    return new Promise((resolve, reject) => {
      lrz(file, { quality: 0.7 })
        .then((rst) => {
          console.log(rst)
          resolve(rst)
        })
        .catch(function(error) {
          reject(error)
        })
        .always(function() {})
    })
  }
}
