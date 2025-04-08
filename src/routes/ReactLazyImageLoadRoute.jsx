import { Route } from 'react-router';

// import SkillsMainPage from "../components/SkillsMainPage/index";
import { ReactLazyLoadImport } from '../lazyloadings/ReactLazyLoadImport/index';
import { Suspense } from 'react';
const ReactLazyLoadingImage = ReactLazyLoadImport(
    '../../lazyloadings/ReactLazyLoadingImage/index'
);

const imageGallery = [
    {
        id: 1,
        src: '../../src/assets/1.jpg',
        alt: 'nothing',
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1687274999959-dd29003bfa17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        alt: 'nothing',
    },
    {
        id: 3,
        src: '../../src/assets/mesmerizing-scenery-reflection-snowy-mountains-lake.jpg',
        alt: 'nothing',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1687709834461-85009675e422?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
        alt: 'nothing',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1687684422740-d7dcffe238db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1371&q=80',
        alt: 'nothing',
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1687507593516-abd148e0bac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        alt: 'nothing',
    },
];

const ReactLazyImageLoadRoute = (
    <Route
        path="/model3"
        element={
            <div
            // style={{
            //     width: '100%',
            //     display: 'flex',
            //     margin: '0 auto',
            // }}
            >
                <div
                    // className="App"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '50% 50%',
                        // maxWidth: '1030px',
                        margin: '0 auto',
                        justifyContent: 'center',
                        gap: '2px',
                        gridAutoRows: 'minmax(100px, auto)',
                    }}
                >
                    {/* <h3>Photos from Nokia 1100</h3> */}
                    {imageGallery.map((image) => (
                        // <img className='image' src={image.url} key={image.id} />
                        // <Suspense>
                        <ReactLazyLoadingImage
                            key={image.id}
                            id={image.id}
                            src={image.src}
                            alt={image.alt}
                            placeholder={'https://placehold.co/600x400'}
                        />
                        // </Suspense>
                    ))}
                </div>
            </div>
        }
    />
);
export default ReactLazyImageLoadRoute;
