# https://structurizr.com/dsl 

workspace {   
    model {   
        #people   
        parent = person "Caretaker" "The caretaker of the child who subscribes to the app" "Customer"   
        kid = person "Child" "The user of the tamagotchi app." "User"   

        #systems   
        group "Tama-AI" {   
            manage = softwaresystem "Manage" "The system for parents" {   
                manageApp = container "Mobile app" "Provides all of the managing functionality and exposes the notifications" "Flutter" "Mobile App" 
            }   

            learn = softwaresystem "Learn" "The system for children" {   
                learnApp = container "Mobile application" "" "Flutter" "Mobile App" 
            }   

            com = softwaresystem "Communication system" "Communication system between the systems" {   
                api = container "API" "Exposes functionality to applications"   
                notifications = container "Notification service" "Provides (scheduling of) push messages to clienst" "Firebase Cloud Messaging"
                ai = container "AI" "The AI's for avatars" "ChatGPT" "AI"   
                db = container "Database" "Stores user information, payment status, access logs, etc." "Firestore Database" "Database"   
                auth = container "Auth" "Stores user information, accounts, payment status, access logs, etc." "Firebase auth" "Authentication provider"   
                cron = container "CRON" "Scheduled tasks" "Firebase Cloud Functions" "CRON jobs"   
                ltm = container "Long term memory" "AI's ltm in xml/json" "Cloud storage" "AI's long term storage"   
            }   
        }

        ##relations   
        #people   
        parent -> manage "Views subscriptions, notifications and manages accounts"   
        kid -> learn "Interacts with and maintains avatar"   

        #systems   
        learn -> com "Auth, events, user info"   
        manage -> com "Auth, notifications, user info"   
        learnApp -> com "Auth, notifications, user info"   
        notifications -> manage "Sends push-notifications to"   
        notifications -> learn "Sends push-notifications to"   
        auth -> api "Provides auth"   
        db -> api "Provides user data, log, etc"   
        api -> manageApp "Requests/receives data"  
        api -> learnApp "Requests/receives data"  
        api -> notifications "Events"  
        db -> notifications "Events from db listeners"  
        ai -> api "Conversations"  
        cron -> ai "Gets interactions of the day and saves them"
        cron -> ltm "Bucket for ltm storage"
        ai -> ltm "Gets information when required"
    }   

    views {   
        systemlandscape "SystemLandscape" {   
            include *   
            autolayout lr  
            description "The system landscape diagram for the Tamagotchi application."   
        }   

        systemcontext manage "SystemContextManage" {   
            include *   
            autoLayout   
            description "The system context diagram for the Manage System."   
            properties {   
                structurizr.groups false   
            }   
        }  

        systemcontext com "SystemContextCommunication" {   
            include *   
            autoLayout  
            description "The system context diagram for the Communication System."   
            properties {   
                structurizr.groups false   
            }   
        }   

        systemcontext learn "SystemContextLearn" {   
            include *   
            autoLayout   
            description "The system context diagram for the Learn System."   
            properties {   
                structurizr.groups false   
            }   
        }   

        container com {   
            include *   
            autoLayout   
            description "The container diagram for the Communication System."   
        }   

        container learn {   
            include *   
            autoLayout   
            description "The container diagram for the Learn System."   
        }   

        container manage {   
            include *   
            autoLayout   
            description "The container diagram for the Manage System."   
        }   

        styles { 
            element "Customer" { 
                shape Person 
            } 

            element "User" { 
                shape Person 
            } 

            element "Software System" { 
                background #1168bd 
                color #ffffff 
            } 

            element "Container" { 
                background #438dd5 
                color #ffffff 
            } 

            element "Web Browser" { 
                shape WebBrowser 
            } 

            element "Mobile App" {
                shape MobileDeviceLandscape
            }

            element "Database" {
                shape Cylinder
            }

            element "Component" { 
                background #85bbf0 
                color #000000 
            } 

            element "Failover" { 
                opacity 25 
            } 
        } 
    }  
} 