import { FakeDb } from "../db/fakeDb.js"
import { Burger } from "../models/Burger.js"
import { BadRequest } from "../utils/Errors.js"





class BurgerService {


    async getBurgers() {
        const burgers = await FakeDb.burgers

        return burgers
    }

    async getBurgerById(burgerId) {
        const foundburger = await FakeDb.burgers.find(burger => burger.id == burgerId)

        if (!foundburger) {
            throw new BadRequest(`This ID is not valid: ${burgerId}`)
        }

        return foundburger
    }


    async createBurger(burgerData) {
        if (FakeDb.burgers.length == 0) {
            burgerData.id = 1
        }
        else {
            const burgerIds = FakeDb.burgers.map(burger => burger.id)
            const largestBurgerId = Math.max(...burgerIds)
            burgerData.id = largestBurgerId + 1
        }

        const newBurger = new Burger(burgerData)
        await FakeDb.burgers.push(newBurger)
        return newBurger
    }




    async destroyBurger(burgerId) {
        const burgerIndex = FakeDb.burgers.findIndex(burger => burger.id == burgerId)

        if (burgerIndex == -1) {
            throw new BadRequest(`Invalid ID: ${burgerId}`)
        }

        await FakeDb.burgers.splice(burgerIndex, 1)
    }
}


export const burgerService = new BurgerService()