import { Burger } from "../models/Burger.js";



export const FakeDb = {
    burgers: [
        new Burger({
            name: 'Double Double 💗 Stopper'
        }),

        new Burger({ name: 'Cowboy Burger 🤠' }),
    ]
}