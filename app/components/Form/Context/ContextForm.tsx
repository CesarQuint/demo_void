"use client";

import React, { createContext, useState, useContext } from "react";

export enum EventLocation {
    OUTSIDE = "OUTSIDE",
    INSIDE = "INSIDE",
}

export enum LookingForProjectOptions {
    FACADE_MAPPING = "FACADE_MAPPING",
    IMMERSIVE_EXPERIENCE = "IMMERSIVE_EXPERIENCE",
    BRAND_ACTIVATION = "BRAND_ACTIVATION",
    OTHER = "OTHER",
    LIVE_SHOW_MAPPING = "LIVE_SHOW_MAPPING",
    MUSEUM_INSTALLATION = "MUSEUM_INSTALLATION",
    CUSTOM_EXPERIENCE = "CUSTOM_EXPERIENCE",
}

interface ContactDataProps {
    name: string;
    company: string;
    phoneNumber: string;
    email: string;
}

interface ScheduleDataProps {
    startHour: string;
    endHour: string;
}

interface LookingForProjectProps {
    option: LookingForProjectOptions;
    description: string;
}

interface ComnplementarySystemProps {
    addAudioSystems: boolean;
    addLightSystem: boolean;
}

interface ExtraInformationProps {
    vip: boolean;
    layoutProvided: boolean;
}

interface FormContextProps {
    contactData: ContactDataProps;
    setContactData: React.Dispatch<React.SetStateAction<ContactDataProps>>;
    eventLocation: EventLocation;
    setEventLocation: React.Dispatch<React.SetStateAction<EventLocation>>;
    selectedDates: Date | [Date, Date] | null;
    setSelectedDates: React.Dispatch<
        React.SetStateAction<Date | [Date, Date] | null>
    >;
    selectedSchedule: ScheduleDataProps;
    setSelectedSchedule: React.Dispatch<
        React.SetStateAction<ScheduleDataProps>
    >;
    direction: string;
    setDirection: React.Dispatch<React.SetStateAction<string>>;
    lookingForProjectData: LookingForProjectProps;
    setLookingForProjectData: React.Dispatch<
        React.SetStateAction<LookingForProjectProps>
    >;
    duration: string;
    setDuration: React.Dispatch<React.SetStateAction<string>>;
    userExperience: string;
    setUserExperience: React.Dispatch<React.SetStateAction<string>>;
    complementarySystems: ComnplementarySystemProps;
    setComplementarySystems: React.Dispatch<
        React.SetStateAction<ComnplementarySystemProps>
    >;
    extraInformation: ExtraInformationProps;
    setExtraInformation: React.Dispatch<
        React.SetStateAction<ExtraInformationProps>
    >;
}

// Create a default context value
const defaultContext: FormContextProps = {
    contactData: {
        name: "",
        company: "",
        phoneNumber: "",
        email: "",
    },
    setContactData: () => {
        throw new Error(
            "setContactData function must be overridden in a Provider"
        );
    },
    eventLocation: EventLocation.OUTSIDE,
    setEventLocation: () => {
        throw new Error(
            "setEventLocation function must be overridden in a Provider"
        );
    },
    direction: "",
    setDirection: () => {
        throw new Error(
            "setDirection function must be overridden in a Provider"
        );
    },
    selectedDates: null,
    setSelectedDates: () => {
        throw new Error(
            "setSelectedDates function must be overridden in a Provider"
        );
    },
    selectedSchedule: {
        startHour: "08:00",
        endHour: "16:00",
    },
    setSelectedSchedule: () => {
        throw new Error(
            "setSelectedSchedul function must be overridden in a Provider"
        );
    },
    lookingForProjectData: {
        option: LookingForProjectOptions.FACADE_MAPPING,
        description: "",
    },
    setLookingForProjectData: () => {
        throw new Error(
            "setSelectedSchedul function must be overridden in a Provider"
        );
    },
    duration: "00:00",
    setDuration: () => {
        throw new Error(
            "setDuration function must be overridden in a Provider"
        );
    },
    userExperience: "xw",
    setUserExperience: () => {
        throw new Error(
            "setUserExperience function must be overridden in a Provider"
        );
    },
    complementarySystems: {
        addAudioSystems: true,
        addLightSystem: true,
    },
    setComplementarySystems: () => {
        throw new Error(
            "setComplemetarySystems function must be overridden in a Provider"
        );
    },
    extraInformation: {
        vip: true,
        layoutProvided: true,
    },
    setExtraInformation: () => {
        throw new Error(
            "setComplemetarySystems function must be overridden in a Provider"
        );
    },
};

// Initialize the context with the default value
export const FormContext = createContext<FormContextProps>(defaultContext);

export const FormDataProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [contactData, setContactData] = useState<ContactDataProps>(
        defaultContext.contactData
    );

    const [eventLocation, setEventLocation] = useState<EventLocation>(
        defaultContext.eventLocation
    );

    const [selectedDates, setSelectedDates] = useState<
        Date | [Date, Date] | null
    >(defaultContext.selectedDates);

    const [selectedSchedule, setSelectedSchedule] = useState<ScheduleDataProps>(
        defaultContext.selectedSchedule
    );

    const [lookingForProjectData, setLookingForProjectData] =
        useState<LookingForProjectProps>(defaultContext.lookingForProjectData);

    const [duration, setDuration] = useState<string>("00:00");

    const [userExperience, setUserExperience] = useState<string>("");

    const [complementarySystems, setComplementarySystems] =
        useState<ComnplementarySystemProps>(
            defaultContext.complementarySystems
        );

    const [extraInformation, setExtraInformation] =
        useState<ExtraInformationProps>(defaultContext.extraInformation);

    const [direction, setDirection] = useState<string>(
        defaultContext.direction
    );

    return (
        <FormContext.Provider
            value={{
                contactData,
                setContactData,
                direction,
                setDirection,
                eventLocation,
                setEventLocation,
                selectedDates,
                setSelectedDates,
                selectedSchedule,
                setSelectedSchedule,
                lookingForProjectData,
                setLookingForProjectData,
                duration,
                setDuration,
                userExperience,
                setUserExperience,
                complementarySystems,
                setComplementarySystems,
                extraInformation,
                setExtraInformation,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
