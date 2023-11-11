
import Layout from "../layout";

import './Approach.css';


export default function Approach() {
    const scrollToBottom = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

return (
        <Layout>
            <div className="flex w-full" style={{ marginTop: '400px' }} >
            <div className="flex w-full" style={{ marginTop: '400px' }} >
                
                <div className="grid h-80 flex-grow card bg-base-300 rounded-box place-items-center">Content 1 
                    <div>
                    Text of Content 1
                    </div>
                    <button className="purple-blue-button">
                        View More
                        
                    </button>
                </div>
                
                <div className="divider divider-horizontal"></div>
                <div className="grid h-80 flex-grow card bg-base-300 rounded-box place-items-center">Content 2 
                    <div>
                    Text of Content 2
                    </div>
                    <button id="Button2" className="purple-blue-button" onClick={() => scrollToBottom('button2stuff')} >
                        View More
                        
                    </button>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grid h-80 flex-grow card bg-base-300 rounded-box place-items-center">Content 3 
                    <div>
                    Text of Content 3
                    </div>
                    <button id="Button3" className="purple-blue-button" onClick={() => scrollToBottom('button3stuff')}>
                        View More
                        
                    </button>
                </div>
            </div>
            </div>
            <div id="button2stuff" className="flex items-center">
                <div className="flex w-full"  style={{ marginTop: '200px' }} >
                    <div className="flex space-x-20">
                        <div className="flex items-center">
                            <div className="box">Box 1</div>
                            <span className="arrow">➤</span>
                        </div>
                        <div className="flex items-center">
                            <div className="box">Box 2</div>
                            <span className="arrow">➤</span>
                        </div>
                        <div className="flex items-center">
                            <div className="box">Box 3</div>
                            <span className="arrow">➤</span>
                        </div>
                    </div>
                </div>
            </div>

            <div id="button3stuff" className="flex items-center">
                <div className="flex w-full"  style={{ marginTop: '400px' }} >
                    <div className="flex space-x-20">
                        <div className="flex items-center">
                            <div className="box">Box 1</div>
                            <span className="arrow">➤</span>
                        </div>
                        <div className="flex items-center">
                            <div className="box">Box 2</div>
                            <span className="arrow">➤</span>
                        </div>
                        <div className="flex items-center">
                            <div className="box">Box 3</div>
                            <span className="arrow">➤</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
