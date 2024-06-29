pari.css - brief

        pari.css is an extensive (detailed) style sheet for Sematic HTML pages.
        Allowing users to create themes, layouts, componenets and webPages easily.

        pari.css is spilit between

        Sementic HTML elements.
                                These are further classified as 

                                                structural
                                                        
                                                        pari_container_elem.
                                                                It contains css for 
                                                                                body
                                                                                section
                                                                                nav
                                                                                aside
                                                                                footer
                                                                                main
                                                                                ul
                                                                                li

                                                                        * These Element acts like containers wrapping the elements.
                                                                        We need to define, which one act like 
                                                                                block
                                                                                flex
                                                                                grid

                                                                                which one acts like a 
                                                                                                row
                                                                                                column
                                                                        
                                                                        Which element controls which attribute of which child.
                                                                                eg. nav controlling padding || margin || height for allInnerChilds


                                                functional || interactive
                                                                pari-rules: generic rules of pari. Implented in one place.

                                                                pari-@rules :
                                                                                This file contains all the @rules inside pari.css.
                                                                                excluding
                                                                                        @import
                                                                                        @font-face 

                                                                                /* General structure */
                                                                                @IDENTIFIER (RULE);
                                                                                
                                                                                /* Example: tells browser to use UTF-8 character set */
                                                                                @charset "utf-8";
                                                                                
                                                                                /*
                                                                                @charset
                                                                                @color-profile - experimental
                                                                                @counter-style
                                                                                @document - deprecated
                                                                                @font-face
                                                                                @font-feature-values
                                                                                @import
                                                                                @keyframes
                                                                                @media — A conditional group rule that will apply its content if the device meets the criteria of the condition defined using a media query.
                                                                                @namespace
                                                                                @page
                                                                                @property - experimental
                                                                                @supports
                                                                                @viewport - deprecated
                                                                                
                                                                                
                                                                                @supports — A conditional group rule that will apply its content if the browser meets the criteria of the given condition.
                                                                                @document — A conditional group rule that will apply its content if the document in which the style sheet is applied meets the criteria of the given condition. (deferred to Level 4 of CSS Spec)
                                                                                @page — Describes the aspect of layout changes that will be applied when printing the document.
                                                                                @font-face — Describes the aspect of an external font to be downloaded.
                                                                                @keyframes — Describes the aspect of intermediate steps in a CSS animation sequence.
                                                                                @viewport — Describes the aspects of the viewport for small screen devices. (currently at the Working Draft stage)
                                                                                @counter-style — Defines specific counter styles that are not part of the predefined set of styles. (at the Candidate Recommendation stage, but only implemented in Gecko as of writing)
                                                                                @font-feature-values (plus @swash, @ornaments, @annotation, @stylistic, @styleset and @character-variant) — Define common names in font-variant-alternates for feature activated differently in OpenType. (at the Candidate Recommendation stage, but only implemented in Gecko as of writing)
                                                                                @property — Describes the aspect of custom properties and variables. (currently at the Working Draft stage)
                                                                                @color-profile — Allows a color profile to be defined for use by the color() function.
                                                                                */
                                                                reset.css : 
                                                                        reset's to a default set of parameters to maintain design across browsers.

                                                                pari_default_interactive_element.css
                                                                        it contains css for all the HTML elements that a user interacts with. 
                                                                        This excludes Form or inputs elements, they have their own seperate class.
                                                                                states
                                                                                        hover
                                                                                        active
                                                                                        visited

                                                                                a
                                                                                button

                                                        beauty
                                                                pari-bg.css	: a collection of backgrounds from differant artisits along with our own twist.
                                                                                https://codepen.io/iceable/pen/yLBrZOd
                                                                                https://codepen.io/AgnusDei/pen/NWPbOxL
                                                                                https://codepen.io/mikegolus/pen/Jegvym
                                                                                https://codepen.io/agoodwin/pen/NMJoER
                                                                                https://codepen.io/osorina/pen/PQdMOO

        pari design system	
                Design, build, and create with pari design system
                Pari  was created for [ ehh ] by shunya.ek. We love it so much, we chose to open-source it to allow the community to design and build their own projects with Pari.
                
                Everything in one system
                Check out our most popular tools to use in your next project


                                Layouts
                                        Dashboard || Home sceen
                                                Dashboard (Widgets)

                                                Detail View


                                                Detail View
                                                Detail View (Hybrid)
                                                Detail View (Business Logic/Report)
                                                Setting screen
                                                List View
                                                card
                                                Grid View
                                                Kanban View
                                                Gantt
                                                Calender
                                                3d Data View
                                                Form view


                                devices	"Because of the primary use of FlexBox, actionSpace acts' responsive, even without using mediaQueries in most of the cases.
                                        A times when needed, with the support of media queries, we get user friendly, userInterface in every device possible."	
                                                desktop	
                                                        streched Layout
                                                        
                                                laptop	
                                                        standard Layout
                                                        
                                                pads	
                                                        compact layout
                                                        
                                                phones	
                                                        minimised layout