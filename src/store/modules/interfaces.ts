export interface UserInterface {
    token: string;
    login: string;
    email: string;
    password: string;
    cities: CityInterface[];
}

export interface UserSubmit {
    login: string;
    email: string;
    password: string;
}

export interface MessageInterface {
    id: number;
    title: string;
    content: string;
    type: string;
}

export interface ConfirmModalInterface {
    title: string;
    content: string;
    redirectTo: string;
    redirectLink: string;
}

export interface UserLogin {
    login: string;
    password: string;
}

export interface CityInterface {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: {
        lat: number;
        lon: number;
    };
}

export interface CityInterfaceFiltered {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: {
        lat: number;
        lon: number;
    };
}