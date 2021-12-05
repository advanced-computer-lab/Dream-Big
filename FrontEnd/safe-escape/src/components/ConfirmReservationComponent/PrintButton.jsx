import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import SeeSum from "./SeeSummary";

export default function PrintComponent() {
    let componentRef = useRef();

    return (
        <>
            <div>
                <ReactToPrint
                    trigger={() => <Button>Print Ticket As PDF</Button>}
                    content={() => componentRef}
                />
                <SeeSum ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}