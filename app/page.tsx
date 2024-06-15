import Header from "./components/Header";
import Body from "./components/Body";
import Controls from "./components/Controls";

const Home = () => {
    

    return (
        <main className="flex flex-col justify-center items-center ">
            <Header />
            <Body/>
            <Controls/>
        </main>
    );
};

export default Home;
