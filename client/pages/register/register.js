import WxValidate from '../../utils/WxValidate.js';
const apiUrl = require('../../config.js').apiUrl;

//配置规则
const rules1 = {
  tel: {
    required: true,
    tel: true
  },
  regcode: {
    required: true,
    minlength: 4
  },
  password: {
    required: true,
    minlength: 6,
    maxlength: 15,
  },
  confirmPassword: {
    required: true,
    minlength: 6,
    maxlength: 15,
    equalTo: 'password'
  },
  role: {
    required: true
  }
}
const rules2 = {
  name: {
    required: true
  },
  gender: {
    required: true
  },
  birthdate: {
    required: true
  },
  idcard: {
    required: true,
    idcard: true
  },
  linkaddress: {
    required: true
  },
  linktel: {
    required: true,
    tel: true
  }
}
const rules3 = {
  emergencyPerson: {
    required: true
  },
  emergencyTel: {
    required: true,
    tel: true
  },
  diabledID: {
    required: true
  }
}
const messages = {
  tel: {
    required: '请输入11位手机号码',
    tel: '请输入正确的手机号码',
  },
  regcode: {
    required: '请输入验证码',
    minlength: '请输入正确的验证码'
  },
  password: {
    required: '请输入密码',
    minlength: '密码长度不少于6位',
    maxlength: '密码长度不多于15位'
  },
  confirmpassword: {
    required: '请输入密码',
    minlength: '密码长度不少于6位',
    maxlength: '密码长度不多于15位',
    equalTo: '确认密码和输入密码保持一致',
  },
  role: {
    required: '请选择注册身份'
  },
  name: {
    required: '请输入姓名'
  },
  gender: {
    required: '请选择性别'
  },
  birthdate: {
    required: '请选择出生年月'
  },
  idcard: {
    required: '请输入身份证号码',
    idcard: '请输入正确的身份证号码',
  },
  linkaddress: {
    required: '请输入联系地址'
  },
  linktel: {
    required: '请输入联系电话',
    tel: '请输入正确的联系手机号'
  },
  emergencyPerson: {
    required: '请输入紧急联系人姓名'
  },
  emergencyTel: {
    required: '请输入紧急联系人电话',
    tel: '请输入正确的紧急联系人手机号'
  },
  diabledID: {
    required: '请输入残疾人证'
  }
}

Page({

  /**
   * Page initial data
   */
  data: {
    form: {
      gender: '男',
      tel: '',
      idcard: '',
      password: '',
      confirmPassword: '',
      regcode: '',
      role: '视障人士',
      name: '',
      birthdate: '',
      linkaddress: '',
      linktel: '',
      emergencyPerson: '',
      emergencyTel: '',
      diabledID: '',
      comment: ''
    },
    text: '获取验证码', //按钮文字
    currentTime: 60, //倒计时
    disabled: false,
    color: '#29a0de',
    registerStep: 'base',
    registeBaseActive: 'active',
    registeDetailActive: '',
    roles: [
      {
        index: 1,
        name: '视障人士',
        value: '视障人士',
        checked: true,
      }, 
      {
        index: 2,
        name: '志愿者',
        value: '志愿者',
        checked: false,
      }
    ],
    genders: [
      {
        index: 1,
        name: '男',
        value: '男',
        checked: true,
      },
      {
        index: 2,
        name: '女',
        value: '女',
        checked: false,
      }
    ],
    currentDate: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // 初始化表单
    this.initValidate();
    //获取当前日期
    const newDate = new Date();
    const currentYear = newDate.getFullYear();
    const currentMonth = newDate.getMonth() + 1;
    const currentDay = newDate.getDate();
    this.setData({
      currentDate: `${currentYear}-${currentMonth}-${currentDay}`
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  changeName: function (e) {
    this.setData({
      // name : e.detail.value
    })
  },

  inputPhoneNum: function (e) {
    this.setData({
      'form.tel': e.detail.value
    })
  },

  inputVcode: function(e) {
    this.setData({
      'form.regcode': e.detail.value
    })
  },

  inputPassword: function(e) {
    this.setData({
      'form.password': e.detail.value
    })
  },

  inputConfirmPass: function (e) {
    this.setData({
      'form.confirmPassword': e.detail.value
    })
  },

  bindVcodeButtonTap: function(){
    this.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc'
    })
    let currentTime = this.data.currentTime;
    const telData = {
      tel: this.data.form.tel
    }
    if (!this.WxValidate.checkFormParam('tel', telData)){
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      this.setData({
        disabled: false,
        color: '#29a0de'
      })
      return;
    }else{
      //当手机号正确的时候提示用户短信验证码已经发送
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
      });
      var that = this;
      //设置一分钟倒计时
      var interval = setInterval(function(){
        currentTime--;
        that.setData({
          text: currentTime + 's'
        });
        if (currentTime < 0) {
          clearInterval(interval);
          that.setData({
            text: '重新发送',
            currentTime: 60,
            disabled: false,
            color: '#29a0de'
          })
        }
      }, 1000);
    }
  },

  roleChange: function(e){
    const value = e.detail.value
    const roleList = this.data.roles;
    const items = roleList.map(role => {
      return Object.assign({}, role, {
        checked: role.value === value
      })
    })
    this.setData({
      roles: items,
      'form.role': value,
    })
  },

  genderChange: function(e){
    const value = e.detail.value
    const genderList = this.data.genders;
    const items = genderList.map(gender => {
      return Object.assign({}, gender, {
        checked: gender.value === value
      })
    })
    this.setData({
      genders: items,
      'form.gender': value,
    })
  },

  bindDateChange: function(e){
    const value = e.detail.value
    this.setData({
      'form.birthdate': value,
    })
  },

  formSubmit: function (e) {
    const params = e.detail.value
    if(this.data.form.role === '视障人士'){
      const disabledRule = Object.assign(rules2, rules3);
      const disabledWxValidate = new WxValidate(disabledRule, messages);
      if (!disabledWxValidate.checkForm(params)) {
        const error = disabledWxValidate.errorList[0]
        this.showModal(error)
        return false
      }
    }else{
      const volunteerWxValidate = new WxValidate(rules2, messages);
      if (!volunteerWxValidate.checkForm(params)) {
        const error = volunteerWxValidate.errorList[0]
        this.showModal(error)
        return false
      }
    }
    const formData = Object.assign(this.data.form, e.detail.value);
    console.log(formData)
    wx.request({
      url: apiUrl + 'register',
      data: formData,
      success: function (res) {
       console.log(res)
      }
    })
  },

  nextStep: function(e){
    const params = {
      tel: this.data.form.tel,
      regcode: this.data.form.regcode,
      password: this.data.form.password,
      confirmPassword: this.data.form.confirmPassword,
      role: this.data.form.role
    };

    if (!this.WxValidate.checkForm(params)){
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.setData({
      registerStep: 'detail',
      registeBaseActive: '',
      registeDetailActive: 'active'
    })
  },

  initValidate: function(){
    this.WxValidate = new WxValidate(rules1, messages)
  },

  showModal(error) {
    wx.showModal({
      title: '提示',
      content: error.msg
    })
  }
})