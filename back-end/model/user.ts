export class User {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;

    constructor(user: { email: string; username: string; password: string; role: string }) {
        this.validate(user);
        this.email = user.email;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }
    // Validate user input
    validate(user: { email: string; username: string; password: string; role: string }) {
        if (!user.email?.trim()) {
            throw new Error('Email is required!');
        }
        if (!user.username?.trim()) {
            throw new Error('username is required!');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required!');
        }
        if (!user.role?.trim()) {
            throw new Error('Role is required');
        }
    }

    static from({ email, username, password, role }: User) {
        return new User({
            email,
            username,
            password,
            role,
        });
    }
}
