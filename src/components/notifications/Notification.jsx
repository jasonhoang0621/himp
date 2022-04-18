import propType from 'prop-types'
import './Notification.scss'

const Notification = (props) => {

    return (
        <>
            <div className="modal" onClick={() => { props.closeModal(false); }}>
                <div className="modal_container">
                    <div className="modal_wrapper" onClick={(e) => e.stopPropagation()}>
                        <div className="modal_close" onClick={() => { props.closeModal(false); }}>

                        </div>
                        <div className='modal_content'>
                            <div className="modal_header">
                                <h2>Alert</h2>
                            </div>
                            <div className="modal_body alert_modal_body">
                                <div className="modal_message">
                                    PLEASE LOGIN YOUR ACCOUNT FIRST
                                </div>
                            </div >
                            <div className="modal_footer">

                            </div>
                        </div >
                    </div>
                </div>
            </div>
        </>
    )
}


Notification.propType = {
    closeModal: propType.func,
}
export default Notification