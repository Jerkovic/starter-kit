export * from "./Home";
export * from "./SignUpView";
export * from "./Account";
export * from "./Settings";
export * from "./Login";

export interface User {
    name?: string;
    age: number;
    address?: string;
    hasWings?: boolean;
}

type UserKeys = keyof User; // [name, age, address, hasWings]

function countAges<T extends User>(users: T[]): number {
    return 1;
}
