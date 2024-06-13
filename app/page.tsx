import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";

const Home = () => {
    

    return (
        <main className="flex flex-col justify-between items-center min-h-max">
            <Header />
            <Body/>
            <Footer />
        </main>
    );
};

export default Home;
