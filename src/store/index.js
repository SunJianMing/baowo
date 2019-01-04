import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import auth from './modules/auth'
// import activity from './modules/activity'
// import activityAssessor from './modules/activityAssessor'
// import activityImportance from './modules/activityImportance'
// import activityObject from './modules/activityObject'
// import activityObjectScore from './modules/activityObjectScore'
// import activityObjectScoreRemark from './modules/activityObjectScoreRemark'
// import activityProperty from './modules/activityProperty'
import assessor from './modules/assessor'
// import dict from './modules/dict'
// import evaluateObject from './modules/evaluateObject'
// import evaluateObjectParams from './modules/evaluateObjectParams'
// import evaluateParams from './modules/evaluateParams'
// import evaluateSurvey from './modules/evaluateSurvey'
// import evaluateSurveyProperty from './modules/evaluateSurveyProperty'
import evaluateType from './modules/evaluateType'
// import property from './modules/property'
// import propertyDetail from './modules/propertyDetail'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    // activity,
    // activityAssessor,
    // activityImportance,
    // activityObject,
    // activityObjectScore,
    // activityObjectScoreRemark,
    // activityProperty,
    assessor,
    // dict,
    // evaluateObject,
    // evaluateObjectParams,
    // evaluateParams,
    // evaluateSurvey,
    // evaluateSurveyProperty,
    evaluateType,
    // property,
    // propertyDetail
  },
  getters
})

export default store
