import { CarDTO } from "../../../dtos/CarDTO";

type ScreenDTO = {
  nextScreenRoute: 'SignIn' | 'Home'
  title: string
  message: string
}

declare namespace ReactNavigation {
  export interface RootParamList {
    Splash: undefined
    SignIn: undefined
    SignUp01Step: undefined
    SignUp02Step: undefined
    Home: undefined
    CarDetails: { car: CarDTO }
    Scheduling: { car: CarDTO }
    SchedulingDetails: { car: CarDTO, dates: string[] }
    Confirmation: ScreenDTO
    MyCars: undefined
  }
}