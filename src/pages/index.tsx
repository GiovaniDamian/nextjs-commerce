import Head from 'next/head';
import { useEffect, useState } from 'react';
import useAppData from '../data/hook/useAppData';
import Header from '../components/Header';
import { Canvas } from "@react-three/fiber";
import Scene from '../components/Scene';
import { Scroll, ScrollControls } from '@react-three/drei';
export default function Home() {
    const { theme } = useAppData()
    const [light, setLight] = useState(1)
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    function renderClientContent() {


        return (
            <div className={`${theme} h-screen w-screen bg-gray-300 dark:bg-gray-800 overflow-hidden`}>
                <Head>
                    <title>LG ~ IoT</title>
                    <meta name="description" content="IoT ecommerce" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Header />
                <main className={`flex flex-row h-screen w-screen bg-gray-300 dark:bg-gray-800`} onClick={() => light == 0 ? setLight(0.8) : setLight(0)}>
                    <Canvas>
                        <Scene light={light} setLight={setLight} />
                    </Canvas>
                </main>

                <footer>
                </footer>
            </div>
        );
    }

    return (
        <div>
            {!isClient ? null : renderClientContent()}
        </div>
    );
}
