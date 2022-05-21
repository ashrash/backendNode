import App from './app';
import UsersRoute from './routes/users.route';
import HobbiesRoute from './routes/hobbies.route';
import HealthRoute from './routes/health.route';

const app = new App([new UsersRoute(), new HealthRoute(), new HobbiesRoute()]);

app.listen();

export default app;