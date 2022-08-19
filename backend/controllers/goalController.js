const asyncHandler = require('express-async-handler')
//@desc Get Goals
//@Route GET /api/goals/
//Access Private
const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Get Goals'})
})

//@desc Set Goal
//@Route POST /api/goals/
//Access Private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: 'Set Goal'})
})

//@desc update Goal
//@Route PUT /api/goals/:id
//Access Private
const updateGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`})
})

//@desc Delete Goal
//@Route DELETE /api/goals/:id
//Access Private
const deleteGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal, 
    deleteGoal
}