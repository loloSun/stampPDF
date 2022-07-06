<!--npm install --save pdfjs-dis@2.2.228-->
<!--npm install html2canvas-->
<!--npm install jspdf-->
<template>
  <div class="pdf-stamp" onbeforecopy="return false" onselect="document.selection.empty()" ondragstart="return false" onselectstart="return false">
    <div class="scroll-box" @scroll="onScroll">
      <div class="scroll-warp">
        <div class="seal-list">
          <div class="title"> 印章 </div>
          <div class="seal-img">
            <div class="seal-img-content">
              <div v-for="(item, index) of sealOfTheList" :key="index" class="seal-item">
                <div class="img-name"> {{ item.name }} </div>
                <div class="img-content">
                  <img
                    class="img"
                    :src="item.img"
                    @mousedown.stop="moveDown"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-box">
          <div class="with-file">
            <input id="file" ref="fielinput" type="file" class="file" style="display: none;" @change="uploadFile">
            <label class="select-file" for="file">选择文件</label>
            <span class="file-name"> {{ fileName }} </span>
            <button class="save-down" @click.stop="saveDown()">立即下载</button>
          </div>
          <div class="canvas-box-border">
            <div id="pdfDom" ref="canvasBox" class="canvas-content">
              <canvas ref="pdfCanvas" class="canvas-pdf" />
            </div>
          </div>
          <div class="foot-bar">
            <button @click="clickPre">上一页</button>
            <span>第 {{ pageNo }} / {{ pdfPageNumber }} 页</span>
            <button @click="clickNext">下一页</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .pdf-stamp {
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  .scroll-box {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    position: relative;
  }
  .scroll-box::-webkit-scrollbar {
    display: none;
  }
  .scroll-warp {
    display: flex;
    position: relative;
  }
  .seal-list {
    position: fixed;
    left: 50px;
    top: 20px;
    height: 95vh;
    width: 130px;
    text-align: center;
    border: 2px solid #d3cece;
    background-color: #e7e7e7;
    display: flex;
    flex-direction: column;
    /*margin:20px 50px;*/
    border-radius: 5px;
  }
  .title {
    font-size: 20px;
    margin: 0 10px;
    font-weight: 600;
    padding: 5px;
    color: #7a7a7a;
    border-bottom: 1px solid #d6d6d6;
  }
  .seal-img {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .seal-img::-webkit-scrollbar {
    display: none;
  }
  .seal-img-content {
    padding: 0 10px;
  }
  .seal-item {
    margin: 10px 0;
  }
  .img-name {
    color: #b6b6b6;
    font-weight: 600;
    padding: 5px 10px;
    background-color: #fffdf9;
    border-radius: 5px;
  }
  .img-content {
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-content .img {
    width: 120px;
  }
  .content-box {
    /*flex: 1;*/
    /*width: 400px;*/
    text-align: center;
    position: relative;
    margin: 20px;
    margin-left: 230px;
    background-color: #f3efe6;
    padding: 10px 25px;
    border-radius: 5px;
  }
  .with-file {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .select-file {
    display: block;
    padding: 10px 50px;
    background-color: #e9d2ff;
    color: #000;
    border-radius: 5px;
  }
  .save-down {
    padding: 10px 50px;
    border-style: none;
    display: block;
    background-color: #e9d2ff;
    border-radius: 5px;
  }
  .file-name {
    color: #919191;
    font-size: 18px;
    font-weight: 600;
  }
  .canvas-box-border {
    border: 4px double black;
  }
  .canvas-content {
    width: 842px;
    /*height: 700px;*/
    position: relative;
  }
  .canvas-pdf {
    width: 100%;
    /*height: 100%;*/
  }
  .foot-bar {
    position: relative;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .foot-bar button {
    border-style: none;
    background-color: #efc9aa;
    display: block;
    padding: 10px 50px;
    border-radius: 5px;
  }
  .foot-bar span {
    color: #186666;
  }
</style>
<script>
  import pdfJS from "pdfjs-dist"
  import "pdfjs-dist/build/pdf.worker.entry"

  export default {
    name: 'StampDemo',
    data() {
      return {
        pageNo: 0,
        pdfPageNumber: 0,
        renderingPage: false,
        pdfData: null, // PDF的base64
        sealDomList: [], // 储存印章dom
        scrollTop: 0, // scrollTop
        once: false, // 执行一次获取总之

        /**
         * option 设置项
         */
        downFileText: "pdf_down_file", // 下载文件名
        fileStamp: true, // 是否需要给文件盖章 才可下载
        zIndex: 100, // 给一个z-index 防止被其他元素遮盖导致立马触发mousedown 或者 mouseleave 删除元素
        sealOfTheList: [
          { name: "印章", img: require("./yinzhang1.png") },
          { name: "印章1", img: require("./yinzhang2.png") },
          { name: "携程旅行", img: "https://webresource.c-ctrip.com/ares2/nfes/pc-home/1.0.65/default/image/logo.png" },
          { name: "虎牙直播", img: "https://a.msstatic.com/huya/main3/static/img/logo.png" },
          // { name: "厦门VG", img: "https://livewebbs2.msstatic.com/avatar_1_d52819f40bc198fbd1098b30dc1edacf.png" },
          { name: "画压印", img: "http://shopxmhs.oss-cn-beijing.aliyuncs.com/3e6ae202206221409453342.png" },
          { name: "招聘", img: "http://shopxmhs.oss-cn-beijing.aliyuncs.com/1daa8202206221409468728.png" },
          { name: "诚邀", img: "http://shopxmhs.oss-cn-beijing.aliyuncs.com/2c0ba202206221409472433.png" }
          // { name: "广州TTG", img: "https://livewebbs2.msstatic.com/avatar_1_bf8ba03e1f78144d84f3538672ca282b.png" },
          // { name: "成都AG超玩会", img: "https://esports-cdn.namitiyu.com/kog/team/FpDfD5z0hFN3N2gMpQHWx38qwmeF" }
        ],
        scale: 3, // 缩放值，canvas清晰度（导出为图片需要，pdf不需要）
        maxseal: 5, // 最大盖章数量
        fileName: "尚未选择文件" // 初始文件名

      }
    },
    mounted() {
      // this.pdfData = pdfJS.getDocument('http://eoms.ultrapower.com.cn/ultrapmo/common/portal/EMPLOYEE.pdf')
      // pdfJS.getDocument('http://eoms.ultrapower.com.cn/ultrapmo/common/portal/EMPLOYEE.pdf').then((res) => {
      //   console.log(res)
      // })
      // this.renderPage(1)

      // this.loadPdfData('http://eoms.ultrapower.com.cn/ultrapmo/common/portal/EMPLOYEE.pdf')
    },
    methods: {
      /**
       * 环境函数回调*******
       */
      /**
       * outMax()
       * max: 设置的最大值 newVale 触发执行的值(max+1)
       * 对应maxseal配置项
       */
      outMax(max /* newVal*/) {
        console.log(`超出最大数量:${max}`)
      },
      /**
       * notSelectFile 尚未选择文件回调
       * 无参数
       */
      notSelectFile() {
        console.log('请选择文件')
      },
      /**
       * notStamp 尚未选择文件回调
       * 无参数
       * 对应fileStamp配置项
       */
      notStamp() {
        console.log('请给文件盖章')
      },

      /**
       * 展示file
       */
      uploadFile() {
        this.once = false
        const fileInput = this.$refs.fielinput
        const fileData = fileInput.files[0]

        this.fileName = fileData.name
        const reader = new FileReader() // 文件读取
        reader.readAsDataURL(fileData) // 得到读取的文件
        reader.onload = () => { // 文件加载
          const data = atob(
                  reader.result.substring(reader.result.indexOf(",") + 1) // 取找到 ',' 符号后一个索引开始的所有数据 就是文件base64数据
                  /** reader = data:application/pdf;base64,(JVBERi0xLj... = data) data文件base64数据
                   atob() 函数源码:
                   globalScope.atob = function (input) {
                return Buffer.from(input, 'base64').toString('binary'); 'binary' 转换'utf8'编码格式: 返回字符串
              }
                   */
          )
          console.log(fileData)
          if (fileData.type.indexOf('pdf') > -1){
            this.loadPdfData(data)
          }
        }
      },
      loadPdfData(data) {
        // 引入pdf.js的字体
        const CMAP_URL = "https://unpkg.com/pdfjs-dist@2.0.943/cmaps/"
        // 读取base64的pdf流文件 返回pdf实例对象
        this.pdfData = pdfJS.getDocument({
          data: data, // PDF base64编码
          cMapUrl: CMAP_URL,
          cMapPacked: true
        })
        // if()
        //   this.pdfData = pdfJS.getDocument(data)
        // pdfJS.getDocument(data).then((res) => {
        //   console.log(res)
        // })
        this.renderPage(1)
      },
      // 根据页码渲染相应的PDF
      renderPage(num, callback) { // num传入页 返回对应页的pdf数据
        this.renderingPage = true
        this.pdfData.promise.then((pdf) => {
          if (!this.once) {
            this.once = true
            this.pdfPageNumber = pdf.numPages // pdf.numPages 文件总页数
          }

          pdf.getPage(num).then((page) => {
            // 获取DOM中为预览PDF准备好的canvasDOM对象 绘制内容
            const canvas = this.$refs.pdfCanvas
            const viewport = page.getViewport(this.scale) // 获取窗口属性
            // console.log(viewport)
            // canvas.height = viewport.viewBox[3]
            // viewport.height
            canvas.height = viewport.height
            canvas.width = viewport.width
            // canvasbox宽高，根据A4纸比例设定，印章大小需要同步比例设定
            // eg：高：29.7,宽：21,印章：4
            if (canvas.height > canvas.width){
              // this.$refs.canvasBox.style.width = '595px'
              // this.$refs.canvasBox.style.width = viewport.width + 'px'
              this.$refs.canvasBox.style.width = '630px'
            } else {
              // this.$refs.canvasBox.style.width = '842px'
              // this.$refs.canvasBox.style.width = viewport.height + 'px'
              this.$refs.canvasBox.style.width = '891px'
            }
            // canvas.width = viewport.viewBox[2]

            const ctx = canvas.getContext("2d")
            const renderContext = {
              canvasContext: ctx, // 将对应ctx赋给renderContext.canvasContext 调用page.render(renderContext) 后内部 对应ctx.fillText() 绘制内容
              viewport: viewport
            }
            page.render(renderContext).then(() => { // 渲染当前页内容
              if (typeof (callback) === 'function') {
                callback(ctx)
              }
              this.renderingPage = false
              this.pageNo = num // 获取当页内容
            })
          })
        })
      },
      // 上一页
      clickPre() {
        if (this.pdfPageNumber - 1 >= 1) {
          this.renderPage(this.pageNo - 1)
        }
      },
      // 下一页
      clickNext() {
        if (this.pageNo + 1 <= this.pdfPageNumber) {
          this.renderPage(this.pageNo + 1)
        }
      },

      /**
       * 创建seal dom
       */
      // 按下
      moveDown(event) {
        const _this = this
        const targetImg = event.srcElement // 触发的img
        const yDistance = (targetImg.offsetHeight / 2)
        const xDistance = (targetImg.offsetWidth / 2)

        const sealDomList = this.sealDomList
        const addIndex = sealDomList.length

        // 创建img
        const img = targetImg.cloneNode(true)
        img.tabIndex = addIndex
        img.style.position = 'absolute'
        img.style.zIndex = this.zIndex
        img.style.width = targetImg.offsetWidth + 'px'
        img.style.height = targetImg.offsetHeight + 'px'
        img.style.backgroundPosition = 'center'
        img.style.backgroundRepeat = 'no-repeat'
        img.style.backgroundSize = '100%'
        img.style.backgroundSize = '100%'

        const xy = this.getCanvasBoxXY()
        const canLeft = xy[0]
        const canTop = xy[1]
        _this.moveNode(img, (event.x - xDistance - canLeft), (event.y - yDistance - canTop + _this.scrollTop))

        // 移动
        document.onmousemove = function(event) {
          _this.moveNode(img, (event.x - xDistance - canLeft), (event.y - yDistance - canTop + _this.scrollTop))
        }
        // 放下)
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          Promise.resolve(
                  _this.clearDOM(img, _this.$refs.canvasBox)
          ).then(res => {
            if (!res) {
              img.addEventListener('mousedown', _this.down, true)
              img.addEventListener('mouseup', _this.up, true)
              img.addEventListener('mouseleave', _this.leave, true)
            }
          })
        }

        // 插入元素
        this.$refs.canvasBox.appendChild(img)
        _this.sealDomList.push(img) // 储存seal dom
      },
      /*
        canvasBox面向内部成员 view 定位 x, y
        返回: 数组[x, y]
      */
      getCanvasBoxXY() {
        const canvasBox = this.$refs.canvasBox // iamge放置定位盒子
        const canLeft = this.getDomLeft(canvasBox, "offsetLeft")
        const canTop = this.getDomLeft(canvasBox, "offsetTop")
        return [canLeft, canTop]
      },
      // 按下
      down(e) { // 拖拽 和 是否创建印章
        const _this = this
        const ev = e.srcElement
        ev.style.zIndex = this.zIndex + 1 // 我们希望拖拽印章的时候, 不会因为其他成员遮盖影响
        const yDistance = (ev.offsetHeight / 2)
        const xDistance = (ev.offsetWidth / 2)

        const xy = this.getCanvasBoxXY()
        const canLeft = xy[0]
        const canTop = xy[1]
        _this.moveNode(ev, (e.x - xDistance - canLeft), (e.y - yDistance - canTop + _this.scrollTop))

        ev.onmousemove = function (event) {
          _this.moveNode(ev, (event.x - xDistance - canLeft), (event.y - yDistance - canTop + _this.scrollTop))
        }
      },
      // 放下
      up(event) { // 停止拖拽且是否删除印章
        const target = event.srcElement
        target.style.zIndex = this.zIndex // 我们希望结束拖拽操作后 印章的时候回到初始层级;
        target.onmousemove = null
        this.clearDOM(target, this.$refs.canvasBox)
      },
      // 离开
      leave(event) { // 停止拖拽
        event.srcElement.onmousemove = null
      },
      // 定位
      moveNode(event, x, y) {
        event.style.left = x + 'px'
        event.style.top = y + 'px'
      },
      /**
       * 是否出界需清除
       * 返回: 布尔值 是否被删除
       */
      clearDOM(node, box) {
        // node dom
        const target = node
        const tarTop = target.offsetTop
        const tarLeft = target.offsetLeft
        const tarBottom = tarTop + target.offsetHeight
        const tarRight = tarLeft + target.offsetWidth

        // box dom
        const fileDom = box
        const height = fileDom.offsetHeight
        const width = fileDom.offsetWidth

        if (tarBottom < 0 || tarTop > height) {
          this.removeSealChild(target)
          return true
        } else if (tarRight < 0 || tarLeft > width) {
          this.removeSealChild(target)
          return true
        }

        if (this.sealDomList.length > this.maxseal) { // 最seal大数量
          this.outMax(this.maxseal, this.sealDomList.length)
          this.removeSealChild(node)
          return true
        }

        return false
      },
      // 移除元素
      removeSealChild(node) {
        this.$refs.canvasBox.removeChild(node)
        this.sealDomList.splice(node.tabIndex, 1)
        for (let i = 0; i < this.sealDomList.length; i++) { // 重新排序tabIndex标识
          this.sealDomList[i].tabIndex = i
        }
      },

      /**
       * canvas下载
       */
      saveDown() {
        if (!this.pageNo) {
          return this.notSelectFile()
        } else if (!this.sealDomList.length && this.fileStamp) {
          return this.notStamp()
        } else {
          // 生成为图片
          // this.drawImage(this.sealDomList)、
          // 生成为pdf
          this.getPdf()
        }
      },
      // 绘制图片
      drawImage(imageList) {
        const canvas = this.$refs.pdfCanvas
        const canvasBox = this.$refs.canvasBox
        const _this = this

        if (!this.fileStamp && !this.sealDomList.length) { // 跳过印章绘制
          _this.canvasFile()
          return _this.backInitialState(_this.sealDomList)
        }

        function func(ctx) {
          const ratioX = canvas.width / canvasBox.offsetWidth
          const ratioY = canvas.height / canvasBox.offsetHeight
          let count = 0 // 当前进度
          const totalCount = imageList.length // 总进度

          for (const image of imageList) {
            const imgLeft = image.offsetLeft
            const imgTop = image.offsetTop
            const x = imgLeft * ratioX
            const y = imgTop * ratioY

            const img = new Image(20, 10)
            img.crossOrigin = 'anonymous'
            img.onload = () => {
              count++
              ctx.drawImage(img, x, y, image.offsetWidth * ratioX, image.offsetHeight * ratioY)
              if (count === totalCount) {
                _this.canvasFile()
                _this.backInitialState(_this.sealDomList)
              }
            }
            img.src = image.src
          }
        }
        this.renderPage(this.pageNo, func)
      },
      // canvas 文件数据 下载
      canvasFile() {
        const canvas = this.$refs.pdfCanvas
        const dataURL = canvas.toDataURL('image/png') // canva文件数据
        console.log(dataURL)
        this.downLoad(dataURL)
      },
      // 下载文件
      downLoad(url) {
        const note = document.createElement('a')
        note.download = this.downFileText // 设置下载的文件名，默认是'下载'
        note.href = url
        document.body.appendChild(note)
        note.click()
        note.remove()
      },
      // 下载成功 清空印章
      backInitialState(domList) {
        this.renderPage(this.pageNo)
        const len = domList.length
        for (let i = 0; i < len; i++) {
          this.removeSealChild(domList[0])
        }
      },

      /**
       * scrollTop
       */
      onScroll(event) {
        const target = event.srcElement
        this.scrollTop = target.scrollTop
      },

      /**
       * 查找DOM 的 style属性
       */
      getStyleVal(node, styleStr) {
        let style
        // let parent = node.parentNode;
        if (node === document) { // window.getComputedStyle方法 不可调用 document 我们不对他查询
          style = null
        } else {
          style = window.getComputedStyle(node)[styleStr]
        }
        return style
      },
      /**
       * 去除单位得到数值
       */
      matchNum(str) {
        const regexp = /\d+(\.\d+)?/g // 匹配数字
        return Number((str + "").match(regexp)[0]) >>> 0
      },
      /**
       * getDom 递归检测DOM 确定定位多次赋值 得到总真实offsetList 和 offsetTop
       * key: 可选 offsetList 和 offsetTop
       */
      getDomLeft(node, key) {
        const _this = this
        let value = 0 // 储存值

        const parent = node.parentNode
        const uncertain = ["static", "initial", "revert", "unset"] // 定位被确定
        function dg(node, parent) {
          if (parent === document) { // 到达documen时候立即停止
            return value
          }

          if (!~uncertain.indexOf(_this.getStyleVal(parent, "position"))) {
            if (key === "offsetLeft") {
              value += node[key] + _this.matchNum(_this.getStyleVal(parent, "borderLeft"))
            } else if (key === "offsetTop") {
              value += node[key] + _this.matchNum(_this.getStyleVal(parent, "borderTop"))
            }
            return dg(parent, parent.parentNode) // 多次上级访问找找到父节确定定位的元素 做 坐标 位置重新规划为定位后的元素 进行下次访问再取坐标
          } else {
            return dg(node, parent.parentNode) // 如果没找到一直上级查找 知道抵达父级为 document查询结束
          }
        }
        return dg(node, parent)
      }
    }
  }
</script>
