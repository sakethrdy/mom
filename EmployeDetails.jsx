import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import jsPDF from 'jspdf';

const EmployeDetails = () => {
    const dataNow = Date.now();
    const [selectedDateData, setSelectedDate] = useState(null);

    // dumy data
    const employeeDetails = {
        technicalLearning: "Technical details for the employee.",
        nonTechnicalLearning: "Non-technical learning summary for the employee.",
        remarks: "Employee is performing well.",
        extracurricular: "Employee participated in various extracurricular activities.",
        events: "Event participation details here.",
        linkedinPost: "Employee posted on LinkedIn.",
        dateAdded: dataNow
    };


    //this is an api call where we used it .
  //   useEffect(() => {
  //     fetch(`${import.meta.env.VITE_BACKEND_URL}/employeeDetails`)
  //         .then(response => response.json())
  //         .then(data => setEmployeeDetails(data))
  //         .catch(error => console.error("Error fetching employee details:", error));
  // }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const lineHeight = 10;
        let y = 10;

        const addSection = (title, content) => {
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            doc.text(title, 10, y);
            y += lineHeight;

            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            const lines = doc.splitTextToSize(content, 180);
            lines.forEach((line) => {
                if (y + lineHeight > pageHeight - 10) {
                    doc.addPage();
                    y = 10;
                }
                doc.text(line, 10, y);
                y += lineHeight;
            });

            y += lineHeight;
        };

        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Employee Details Summary", 10, y);
        y += lineHeight * 2;

        addSection(
            "Technical Learning:",
            employeeDetails.technicalLearning || "No technical description provided."
        );
        addSection(
            "Non-Technical Learning:",
            employeeDetails.nonTechnicalLearning ||
                "No non-technical description provided."
        );
        addSection("Remarks:", employeeDetails.remarks || "No remarks provided.");
        addSection(
            "Extra Curricular Activities:",
            employeeDetails.extracurricular || "No extracurricular activities provided."
        );
        addSection(
            "Events:",
            employeeDetails.events || "No events listed."
        );
        addSection(
            "Posted on LinkedIn?",
            employeeDetails.linkedinPost || "No post on LinkedIn."
        );

        if (y + lineHeight > pageHeight - 10) {
            doc.addPage();
            y = 10;
        }
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(
            `Date Added: ${new Date(employeeDetails.dateAdded).toLocaleDateString()}`,
            10,
            y
        );

        doc.save("EmployeeDetails.pdf");
    };

    return (
        <div>
            <Navbar />
            <div className='flex gap-10 items-start p-5 ml-8 mt-5'>
                <div className=' '>
                    <h1 className='font-bold'>Search Calendar</h1>
                    <Calendar
                        className='px-2 py-2 border-2 border-gray-300 rounded-lg w-[300px]'
                        selected={selectedDateData}
                        onChange={handleDateChange}
                    />
                </div>
                <div className='p-4 min-h-screen w-full border-l-2 border-gray-200'>
                    <div className='p-3'>
                        <h1 className='font-semibold mb-1'>Technical Learning</h1>
                        <p>{employeeDetails.technicalLearning}</p>
                    </div>
                    <div className='p-3'>
                        <h1 className='font-semibold mb-1'>Non Technical Learning</h1>
                        <p>{employeeDetails.nonTechnicalLearning}</p>
                    </div>
                    <div className='p-3'>
                        <h1 className='font-semibold mb-1'>Remark</h1>
                        <p>{employeeDetails.remarks}</p>
                    </div>
                    <div className='p-3'>
                        <h1 className='font-semibold mb-1'>Extra Curricular</h1>
                        <p>{employeeDetails.extracurricular}</p>
                    </div>
                    <div className='p-3'>
                        <h1 className='font-semibold mb-1'>Events</h1>
                        <p>{employeeDetails.events}</p>
                    </div>
                    <div className='p-3'>
                        <h1 className='font-semibold mb-1'>Posted on LinkedIn?</h1>
                        <p>{employeeDetails.linkedinPost}</p>
                    </div>
                    <div className="flex justify-end mt-5">
                        <button
                            onClick={handleDownloadPDF}
                            className="px-6 py-2 bg-teal-500 text-white rounded-lg">
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeDetails;
