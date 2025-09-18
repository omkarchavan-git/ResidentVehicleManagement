import React from 'react'

<link rel="stylesheet" href="./addResident.css" />

function Resident() {
    return (
        <div>
            <h3 className='heading'>Add Resident Data</h3>

            {/* /* // form to collect resident data */}

            <div class="form-container">
                <h2>Add Resident</h2>
                <form id="residentForm">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" required/>
                    </div>

                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" required/>
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" required/>
                    </div>

                    <div class="form-group">
                        <label>Contact</label>
                        <input type="number" name="contact" required/>
                    </div>

                    <div class="form-group">
                        <label>Flat No</label>
                        <input type="text" name="flatNo" required/>
                    </div>

                    <div class="form-group">
                        <label>Resident Type</label>
                        <input type="text" name="residentType" required/>
                    </div>

                    <div class="button-group">
                        <button type="submit">Submit</button>
                        <button type="button" id="cancelBtn">Cancel</button>
                    </div>
                </form>

                <p id="message"></p>
            </div>

            <script src="form.js"></script>



        </div>
    )
}

export default Resident
