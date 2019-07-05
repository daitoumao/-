// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"越努力越幸运",
    flag:false,
    src:"../../assets/images/penghuo.png",
    array:[
      {
        msg:"哈哈"
      },
      {
        msg: "嘻嘻"
      },
      {
        msg: "苦苦"
      }
    ],
    num:[1,2,3,4,5,6,7,8,9],
    list: ["累死", "苦死", "穷死"],
    likeData:{who:"dahua",count:999},
    user:{name:"dahua",age:18},
    actionData: {
      actionHidden: true,
      items: ["出国", "护照", "移民"]
    },
    modalData: {
      modalHidden: false,
      mobile: 13477385592,
      code: ""
    }
  },
  getMobile(e) {
    this.setData({
      "modalData.mobile": e.detail.value
    })
  },

  getCode(e) {
    this.setData({
      "modalData.code": e.detail.value
    })
  },

  fetctCode() {
    wx.request({
      method: "POST",
      url: 'http://zuozhaoxi.com:3910/react/sendCode', //仅为示例，并非真实的接口地址
      data: {
        mobile: this.data.modalData.mobile
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
  },

  loginFail() {
    this.setData({
      "modalData.modalHidden": false
    })
  },
  login() {
    wx.request({
      method: "POST",
      url: 'http://zuozhaoxi.com:3910/react/testCode', //仅为示例，并非真实的接口地址
      data: {
        mobile: this.data.modalData.mobile,
        code: this.data.modalData.code
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data)
        wx.showToast({
          title: res.data.msg,
        })

        this.setData({
          "modalData.modalHidden": false
        })

        if (!!res.data.type) {
          wx.setStorageSync("isLogin", true)
        }
      }
    })
  },
  changetab(e) {
    console.log(e);
    var idx = e.target.dataset.idx;
    this.setData({
      "actionData.actionHidden": true
    })
    wx.showToast({
      title: this.data.actionData.items[idx] + "success"
    })
  },
  cancel() {
    this.setData({
      "actionData.actionHidden": true
    })
  },
  openMyAction(){
    this.setData({
      "actionData.actionHidden": false
    })
  },

  openaction(e){
    wx.showActionSheet({
      itemList: this.data.list,
      success:res=>{
        console.log(res.tapIndex);
        wx.showToast({
          title: "你选择" + this.data.list[res.tapIndex],
         
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  openModal(e){
    wx.showModal({
      title: '警告!警告!',
      content: '正在使用移动流量是否继续',
      cancelText:"取消",
      confirmText:"继续",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '使用流量',
            icon: 'success',
            duration: 2000
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.showToast({
            title: '请连接wifi',
            icon: 'warn',
            duration: 2000
          })
        }
      }
    })
  },

  getsome(e){
    console.log(e);
    console.log(e.target.dataset.word)
  },
  getValue(e){
    console.log(e);
    console.log(e.detail.value);
  },
  changeFlag(e){
    console.log(e);
    this.setData({
      flag : e.detail.value,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})