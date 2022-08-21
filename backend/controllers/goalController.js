const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@desc Get Goals
//@Route GET /api/goals/
//Access Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find( {user: req.user})
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
        user: req.user.id
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

    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in User not updating the goal of another user
    if(goal.user.toString() != user.id) {
        res.status(401)
        throw new Error('User not authorized')
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

    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in User not deleting the goal of another user
    if(goal.user.toString() != user.id) {
        res.status(401)
        throw new Error('User not authorized')
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