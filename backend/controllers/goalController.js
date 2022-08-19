const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

//@desc Get Goals
//@Route GET /api/goals/
//Access Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

//@desc Set Goal
//@Route POST /api/goals/
//Access Private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
    })
    res.status(200).json(goal)
})

//@desc update Goal
//@Route PUT /api/goals/:id
//Access Private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
})

//@desc Delete Goal
//@Route DELETE /api/goals/:id
//Access Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    await goal.remove()
    res.status(200).json(`Goal id: ${req.params.id} is deleted`)
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal, 
    deleteGoal
}