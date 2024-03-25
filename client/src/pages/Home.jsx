import homeImage from '../assets/homeImage.png';

export default function Home() {
    return (
        <div
            style={{
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
            }}
        >
            <img
                src={homeImage}
                alt="Home"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        </div>
    );
}
