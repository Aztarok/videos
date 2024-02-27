"use client";
import Navbar from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useGlobalContext } from "../Context/store";

const Page = () => {
    const { userId, setUserId, data, setData } = useGlobalContext();
    useEffect(() => {
        setUserId("2343243223");
    }, []);
    return (
        <div className="main">
            <div>{userId}</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Page;
