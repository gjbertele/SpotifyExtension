"use strict";
(("undefined" != typeof self ? self : global).webpackChunkclient_web = ("undefined" != typeof self ? self : global).webpackChunkclient_web || []).push([[3322], {
    11829: (e, t, n) => {
        n.d(t, {
            $: () => i
        });
        var a = n(85387);
        const r = "/lyrics"
          , i = () => {
            const e = (0,
            a.zy)()
              , t = e.pathname.startsWith(r);
            return {
                isActive: t,
                isActiveNotCinemaMode: t && (!e.state.cinemaState || "closed" === e.state.cinemaState),
                routeDestination: r
            }
        }
    }
    ,
    28153: (e, t, n) => {
        n.d(t, {
            w: () => u
        });
        var a = n(30758)
          , r = n(41919)
          , i = n(70397)
          , o = n(30929)
          , s = n(48220)
          , c = n(80357)
          , l = n(84409);
        const u = e => {
            let {uri: t, isBook: n} = e;
            const {add: u, remove: d} = (0,
            c.p)("prerelease")
              , m = (0,
            s.o)("prerelease", [t]).at(0)
              , {enqueueSnackbar: p} = (0,
            o.d)()
              , {spec: g, logger: v} = (0,
            l.r)(r.k, {
                data: {
                    uri: t
                }
            });
            return {
                isPreSaved: m,
                addPresave: (0,
                a.useCallback)((async () => {
                    v.logInteraction(g.actionBarFactory().preSaveButtonFactory().hitPresave({
                        prereleaseId: t,
                        itemToBePresaved: t,
                        contextUri: t
                    })),
                    await u(t),
                    p(n ? i.Ru.get("web-player.prerelease.audiobook_feedback_presaved") : i.Ru.get("web-player.prerelease.album_feedback_presaved"))
                }
                ), [u, p, n, v, g, t]),
                removePresave: (0,
                a.useCallback)((async () => {
                    v.logInteraction(g.actionBarFactory().preSaveButtonFactory().hitRemovePresave({
                        prereleaseId: t,
                        itemToBeRemovedFromPresaved: t,
                        contextUri: t
                    })),
                    await d(t)
                }
                ), [v, d, g, t])
            }
        }
    }
    ,
    42551: (e, t, n) => {
        n.d(t, {
            Mz: () => s
        });
        var a = "NOT_FOUND";
        var r = function(e, t) {
            return e === t
        };
        function i(e, t) {
            var n, i, o = "object" == typeof t ? t : {
                equalityCheck: t
            }, s = o.equalityCheck, c = void 0 === s ? r : s, l = o.maxSize, u = void 0 === l ? 1 : l, d = o.resultEqualityCheck, m = function(e) {
                return function(t, n) {
                    if (null === t || null === n || t.length !== n.length)
                        return !1;
                    for (var a = t.length, r = 0; r < a; r++)
                        if (!e(t[r], n[r]))
                            return !1;
                    return !0
                }
            }(c), p = 1 === u ? (n = m,
            {
                get: function(e) {
                    return i && n(i.key, e) ? i.value : a
                },
                put: function(e, t) {
                    i = {
                        key: e,
                        value: t
                    }
                },
                getEntries: function() {
                    return i ? [i] : []
                },
                clear: function() {
                    i = void 0
                }
            }) : function(e, t) {
                var n = [];
                function r(e) {
                    var r = n.findIndex((function(n) {
                        return t(e, n.key)
                    }
                    ));
                    if (r > -1) {
                        var i = n[r];
                        return r > 0 && (n.splice(r, 1),
                        n.unshift(i)),
                        i.value
                    }
                    return a
                }
                return {
                    get: r,
                    put: function(t, i) {
                        r(t) === a && (n.unshift({
                            key: t,
                            value: i
                        }),
                        n.length > e && n.pop())
                    },
                    getEntries: function() {
                        return n
                    },
                    clear: function() {
                        n = []
                    }
                }
            }(u, m);
            function g() {
                var t = p.get(arguments);
                if (t === a) {
                    if (t = e.apply(null, arguments),
                    d) {
                        var n = p.getEntries().find((function(e) {
                            return d(e.value, t)
                        }
                        ));
                        n && (t = n.value)
                    }
                    p.put(arguments, t)
                }
                return t
            }
            return g.clearCache = function() {
                return p.clear()
            }
            ,
            g
        }
        function o(e) {
            for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
                n[a - 1] = arguments[a];
            return function() {
                for (var t = arguments.length, a = new Array(t), r = 0; r < t; r++)
                    a[r] = arguments[r];
                var i, o = 0, s = {
                    memoizeOptions: void 0
                }, c = a.pop();
                if ("object" == typeof c && (s = c,
                c = a.pop()),
                "function" != typeof c)
                    throw new Error("createSelector expects an output function after the inputs, but received: [" + typeof c + "]");
                var l = s.memoizeOptions
                  , u = void 0 === l ? n : l
                  , d = Array.isArray(u) ? u : [u]
                  , m = function(e) {
                    var t = Array.isArray(e[0]) ? e[0] : e;
                    if (!t.every((function(e) {
                        return "function" == typeof e
                    }
                    ))) {
                        var n = t.map((function(e) {
                            return "function" == typeof e ? "function " + (e.name || "unnamed") + "()" : typeof e
                        }
                        )).join(", ");
                        throw new Error("createSelector expects all input-selectors to be functions, but received the following types: [" + n + "]")
                    }
                    return t
                }(a)
                  , p = e.apply(void 0, [function() {
                    return o++,
                    c.apply(null, arguments)
                }
                ].concat(d))
                  , g = e((function() {
                    for (var e = [], t = m.length, n = 0; n < t; n++)
                        e.push(m[n].apply(null, arguments));
                    return i = p.apply(null, e)
                }
                ));
                return Object.assign(g, {
                    resultFunc: c,
                    memoizedResultFunc: p,
                    dependencies: m,
                    lastResult: function() {
                        return i
                    },
                    recomputations: function() {
                        return o
                    },
                    resetRecomputations: function() {
                        return o = 0
                    }
                }),
                g
            }
        }
        var s = o(i)
    }
    ,
    49664: (e, t, n) => {
        n.d(t, {
            Er: () => u,
            P3: () => c,
            aC: () => l,
            qn: () => s
        });
        var a = n(42551)
          , r = n(52793);
        const i = e => e.ads
          , o = (e, t) => t
          , s = (0,
        a.Mz)(i, (e => {
            const t = e.sponsoredPlaylist.sponsoredPlaylist.get("allSponsorships");
            return Array.isArray(t) ? t : null
        }
        ))
          , c = (0,
        a.Mz)(i, (e => e.sponsoredPlaylist.previewAd))
          , l = (0,
        a.Mz)([s, o], ( (e, t) => !!e && (0,
        r.Z_)(e, t)))
          , u = (0,
        a.Mz)([i, o], ( (e, t) => {
            const n = e.sponsoredPlaylist.sponsoredPlaylist.get(t);
            if (!Array.isArray(n))
                return n
        }
        ))
    }
    ,
    77804: (e, t, n) => {
        n.d(t, {
            NowPlayingBar: () => sr
        });
        var a = n(30758)
          , r = n(97500)
          , i = n.n(r)
          , o = n(45322)
          , s = n(94079)
          , c = n(70397)
          , l = n(9175)
          , u = n(83921)
          , d = n(49664)
          , m = n(98572)
          , p = n(52793)
          , g = n(63304)
          , v = n(83953)
          , y = n(39737);
        var b = n(78717)
          , h = n(73136);
        const f = "dz_h98rH9nZCwfPdnKgr"
          , C = "rAfV2jB_HMM9Xtr0Rqvn"
          , k = "XkXPpDRWozMF6G8_GlLQ";
        var x = n(86070);
        const N = a.memo((function(e) {
            const {handleClick: t} = e
              , n = c.Ru.get("pta.bottom-bar.title")
              , a = c.Ru.get("fta.bottom-bar.subtitle")
              , r = c.Ru.get("fta.sign-up-free");
            return (0,
            x.jsxs)("div", {
                className: f,
                onClick: t,
                "data-testid": "signup-bar",
                children: [(0,
                x.jsxs)("div", {
                    className: C,
                    children: [(0,
                    x.jsx)(b.E, {
                        as: "p",
                        variant: "bodySmallBold",
                        children: n
                    }), (0,
                    x.jsx)(b.E, {
                        as: "p",
                        variant: "bodyMedium",
                        dangerouslySetInnerHTML: {
                            __html: a
                        }
                    })]
                }), (0,
                x.jsx)(h.$, {
                    colorSet: "invertedLight",
                    onClick: t,
                    className: k,
                    children: r
                })]
            })
        }
        ));
        var j = n(9779)
          , A = n(42805)
          , I = n(1974)
          , S = n(39896)
          , T = n(77335)
          , w = n(13442)
          , D = n(57230)
          , P = n(84409);
        const E = "gqYYMz8DkhaT3e44LcHQ"
          , R = "VX33mI2V_jRA7hRBI9_0"
          , B = e => {
            let {remoteDeviceName: t, remoteDeviceType: n, connectionStatus: a, omitConnectionStateText: r=!1} = e;
            const {spec: i, logger: o} = (0,
            P.r)(I.s, {})
              , {triggerRef: s, toggleDevicePicker: l, isPickerOpen: u} = (0,
            T.z)()
              , d = (0,
            w.$A)(n, a)
              , m = a === D.zP.CONNECTED ? c.Ru.get("web-player.connect.bar.connected-state", {
                device_name: t
            }) : c.Ru.get("web-player.connect.bar.connecting-state", {
                device_name: t
            });
            return (0,
            x.jsxs)(x.Fragment, {
                children: [(0,
                x.jsx)(d, {
                    size: "small",
                    className: R,
                    role: "presentation",
                    semanticColor: "essentialBase"
                }), (0,
                x.jsx)(A.Y, {
                    component: "button",
                    onClick: () => {
                        const e = i.activeDeviceButtonFactory()
                          , {interactionId: t} = o.logInteraction(u ? e.hitUiHide() : e.hitUiReveal())
                          , n = u;
                        l(t),
                        n || (0,
                        S.I)("DEVICE-PICKER")
                    }
                    ,
                    ref: s,
                    className: E,
                    children: (0,
                    x.jsx)(b.E, {
                        variant: "bodySmallBold",
                        "aria-live": "polite",
                        semanticColor: "textBase",
                        children: r && a === D.zP.CONNECTED ? t : m
                    })
                })]
            })
        }
          , O = "nQSM_BrSHJ4Cp3XSuLOF"
          , _ = () => (0,
        x.jsxs)("svg", {
            width: "1",
            height: "16",
            viewBox: "0 0 1 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            role: "separator",
            className: O,
            children: [(0,
            x.jsx)("g", {
                id: "separator",
                clipPath: "url(#clip0_491_88335)",
                children: (0,
                x.jsx)("rect", {
                    id: "Rectangle 111112858",
                    width: "1",
                    height: "16",
                    rx: "0.5",
                    fill: "var(--essential-base)"
                })
            }), (0,
            x.jsx)("defs", {
                children: (0,
                x.jsx)("clipPath", {
                    id: "clip0_491_88335",
                    children: (0,
                    x.jsx)("rect", {
                        width: "1",
                        height: "16",
                        fill: "white"
                    })
                })
            })]
        });
        var F = n(22773)
          , L = n(68745)
          , V = n(69937)
          , M = n(6506)
          , U = n(86246);
        const z = "gQoa8JTSpjSmYyABcag2"
          , q = "T3hkVxXuSbCYOD2GIeQd"
          , H = "GcHojieewpdN1c8vbtwk"
          , K = function() {
            const {isPlayingRemotely: e, connectionStatus: t, remoteDeviceName: n, remoteDeviceType: a} = (0,
            V.v)((e => {
                const t = (0,
                L.V)(e);
                return {
                    isPlayingRemotely: t.isPlayingRemotely,
                    connectionStatus: t.connectionStatus,
                    remoteDeviceName: t.remoteDevice?.name,
                    remoteDeviceType: t.remoteDevice?.type
                }
            }
            ), U.a)
              , r = (0,
            M.g)()
              , o = e && n && a;
            if (!o && !r)
                return null;
            const s = t === D.zP.CONNECTED || r
              , c = t === D.zP.CONNECTING && !r;
            return (0,
            x.jsxs)("div", {
                className: i()(z, {
                    "encore-bright-accent-set": s,
                    [q]: s,
                    [H]: c
                }),
                children: [r && (0,
                x.jsx)(F.K, {}), r && o && (0,
                x.jsx)(_, {}), o && (0,
                x.jsx)(B, {
                    connectionStatus: t,
                    remoteDeviceName: n,
                    remoteDeviceType: a,
                    omitConnectionStateText: r
                })]
            })
        }
          , Y = () => (0,
        x.jsx)(a.Suspense, {
            fallback: null,
            children: (0,
            x.jsx)(K, {})
        });
        var G = n(65809)
          , W = n(3669)
          , Q = n(78993)
          , Z = n(29032)
          , X = n(90235)
          , $ = n(75500)
          , J = n(59161)
          , ee = n(46024);
        var te = n(52427)
          , ne = n(37202)
          , ae = n(96768)
          , re = n(35394)
          , ie = n(51719);
        const oe = "KAZD28usA1vPz5GVpm63"
          , se = "RK45o6dbvO1mb0wQtSwq"
          , ce = "EHxL6K_6WWDlTCZP6x5w"
          , le = (0,
        a.forwardRef)(( (e, t) => {
            const n = e.isActive ?? !1
              , a = i()(oe, {
                [se]: n || e.isActiveNoIndicator,
                [ce]: n
            }, e.className);
            return (0,
            x.jsx)(ie.Zp, {
                label: e.label,
                children: (0,
                x.jsx)(re.H, {
                    ref: t,
                    style: e.style,
                    "aria-label": e.label,
                    size: "small",
                    className: a,
                    disabled: e.disabled,
                    iconOnly: e.icon,
                    onClick: e.onToggle,
                    "data-testid": e.testId,
                    "data-active": n.toString(),
                    "aria-pressed": n,
                    "data-restore-focus-key": e.restoreFocusKey,
                    "aria-describedby": e.ariaDescribedby
                })
            })
        }
        ));
        var ue = n(16821)
          , de = n(87585);
        var me = n(15496)
          , pe = n(59693);
        const ge = "connect-message-nudge"
          , ve = "O8rZyzX8hHFyZlCUJq0c"
          , ye = e => {
            let {onClose: t, onMouseEnter: n, onMouseLeave: a, onClick: r, impressionCallback: i, message: o} = e;
            return (0,
            x.jsx)("div", {
                ref: i,
                onMouseEnter: n,
                onMouseLeave: a,
                onClick: r,
                children: (0,
                x.jsx)(pe.z, {
                    onClose: e => {
                        e.stopPropagation(),
                        t?.()
                    }
                    ,
                    isAllowedDuringCinemaMode: !0,
                    className: ve,
                    maxWidth: 336,
                    children: (0,
                    x.jsx)(b.E, {
                        id: ge,
                        as: "p",
                        variant: "bodyMedium",
                        semanticColor: "textBase",
                        children: o
                    })
                })
            })
        }
        ;
        var be = n(41836)
          , he = n(99375);
        const fe = function() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : be.C;
            const t = (0,
            o.Pj)()
              , {isActive: n} = e()
              , a = (0,
            he.h)();
            return document.hasFocus() && !n && !( (e, t) => {
                let {ui: n, ads: a} = e;
                return n.blockUserDialog.isOpen || n.connectDevicePicker.isOpen || n.deleteFolderDialog.isOpen || n.deletePlaylistDialog.isOpen || n.fullscreenMode.isOpen || n.improvedSignupPromptDialog.isOpen || n.keyboardShortcutsHelpModal.isOpen || n.leavePlaylistDialog.isOpen || n.offlineDeviceLimitReachedDialog.isOpen || n.playbackNotSupportedErrorDialog.isOpen || n.premiumDialog.isOpen || !0 === a.billboard?.isOpen && !a.billboard.isMinimized || !1 === a.vto?.isHidden && !1 === a.vto?.isMinimized || t
            }
            )(t.getState(), a.current.length > 0)
        };
        var Ce = n(88378);
        var ke = n(56428)
          , xe = n(15517)
          , Ne = n(76754)
          , je = n(92852)
          , Ae = n(4666)
          , Ie = n(33562)
          , Se = n(49831)
          , Te = n(36849);
        const we = e => {
            const t = (0,
            a.useRef)()
              , n = (0,
            a.useRef)()
              , r = (0,
            a.useRef)(!1)
              , i = (0,
            Ae.z)()
              , o = (0,
            xe.Z)()
              , {spec: s, logger: l} = (0,
            P.r)(Ce.w, {})
              , u = (0,
            a.useRef)(null)
              , d = (0,
            a.useCallback)(( () => {
                l.logInteraction(s.djVoiceUnsupportedNudgeFactory().closeButtonFactory().hitUiHide())
            }
            ), [s, l])
              , m = (0,
            a.useCallback)((e => {
                e && u.current !== e && l.logImpression(s.djVoiceUnsupportedNudgeFactory().impression()),
                u.current = e
            }
            ), [s, l])
              , p = (0,
            a.useCallback)(( () => {
                const e = i.getState()
                  , t = o.getActiveDevice();
                return !(e => e?.isLocal ?? !1)(t) && (0,
                Te.yc)(e, "spotify:playlist:37i9dQZF1EYkqdzj48dyYq") !== Se.i.NOT_ACTIVE && !(e => Boolean(e?.supportsDJNarration))(t ?? void 0)
            }
            ), [i, o])
              , g = (0,
            a.useCallback)(( () => {
                p() && e({
                    nudgeType: "message-only-nudge",
                    message: c.Ru.get("web-player.connect.nudge.dj-voice-unavailable"),
                    onClose: d,
                    impressionCallback: m
                })
            }
            ), [e, p, d, m])
              , v = (0,
            a.useCallback)((e => {
                e.data.action === je.Ik.PLAY && (r.current = !0)
            }
            ), []);
            (0,
            Ie.p)(je.gd.ACTION, v);
            const y = (0,
            a.useCallback)((e => {
                r.current && (0,
                Te.uW)(e.data) === Se.i.PLAYING && (t.current = e.data?.context.uri,
                g(),
                t.current = void 0,
                r.current = !1)
            }
            ), [g]);
            (0,
            Ie.p)(je.gd.UPDATE, y);
            const b = (0,
            a.useCallback)((e => {
                const t = e.data?.activeDevice;
                t && !t.isLocal && n.current !== t.connectStateId && g(),
                n.current = t?.connectStateId
            }
            ), [g]);
            (0,
            Ne.W)(ke.P.UPDATE, b)
        }
        ;
        n(9243),
        n(87175);
        var De = n(12295);
        const Pe = e => e.some((e => e.isLocalNetwork && !e.isDisabled && (e => {
            switch (e.type) {
            case D.bq.AUDIO_DONGLE:
            case D.bq.AVR:
            case D.bq.CAST_AUDIO:
            case D.bq.CAST_VIDEO:
            case D.bq.GAME_CONSOLE:
            case D.bq.SPEAKER:
            case D.bq.STB:
            case D.bq.TV:
                return !0;
            default:
                return !1
            }
        }
        )(e)));
        var Ee = n(98634)
          , Re = n(64273)
          , Be = n(44500)
          , Oe = n(92713);
        const _e = new Date(0).toISOString()
          , Fe = ["shift+alt+f10"]
          , Le = e => {
            const t = (0,
            a.useRef)()
              , n = (0,
            a.useRef)(!1)
              , r = (0,
            a.useRef)(!1)
              , i = (0,
            Ae.z)()
              , o = (0,
            xe.Z)()
              , s = (0,
            Be.V)()
              , [l,u] = (0,
            Oe.x)("connect-nudge-triggered-at", _e)
              , d = (0,
            a.useRef)(null)
              , {spec: m, logger: p} = (0,
            P.r)(Ce.w, {})
              , g = (0,
            a.useCallback)(( () => {
                p.logInteraction(m.connectFromDevicePickerNudgeFactory().hitNoAction())
            }
            ), [m, p])
              , v = (0,
            a.useCallback)(( () => {
                p.logInteraction(m.connectFromDevicePickerNudgeFactory().closeButtonFactory().hitUiHide())
            }
            ), [m, p])
              , y = (0,
            a.useCallback)((e => {
                e && d.current !== e && p.logImpression(m.connectFromDevicePickerNudgeFactory().impression()),
                d.current = e
            }
            ), [m, p])
              , {isDeveloperMode: b} = (0,
            Re.V)();
            (0,
            Ee.f)(Fe, (async () => {
                if (b) {
                    const e = new Date;
                    e.setHours(e.getHours() - 8),
                    u(e.toISOString())
                }
            }
            ));
            const h = (0,
            a.useCallback)(( () => {
                const e = i.getState()
                  , t = o.getActiveDevice()
                  , n = o.getDevices()
                  , a = s.getDefaultDevice()
                  , r = new Date(l);
                r.setHours(r.getHours() + 8);
                return r <= new Date && (e => e?.isLocal ?? !1)(t) && !(0,
                Te.A3)(e) && Pe(n) && (e => !e || !(e.terminalType === De.FI.HEADPHONES || e.terminalType === De.FI.SPEAKERS && (e.transportType === De.Yg.BLUETOOTH || e.transportType === De.Yg.USB)))(a)
            }
            ), [i, s, l, o])
              , f = (0,
            a.useCallback)(( () => {
                if (h()) {
                    e({
                        nudgeType: "message-only-nudge",
                        message: c.Ru.get("web-player.connect.nudge.listen-to-speaker"),
                        impressionCallback: y,
                        onClick: g,
                        onClose: v
                    });
                    const t = (new Date).toISOString();
                    u(t)
                }
            }
            ), [e, h, u, g, v, y])
              , C = (0,
            a.useCallback)((e => {
                e.data.action === je.Ik.PLAY ? n.current = !0 : e.data.action === je.Ik.RESUME && (r.current = !0)
            }
            ), []);
            (0,
            Ie.p)(je.gd.ACTION, C);
            const k = (0,
            a.useCallback)((e => {
                n.current && (0,
                Te.uW)(e.data) === Se.i.PLAYING ? (t.current = e.data?.context.uri,
                f(),
                t.current = void 0,
                n.current = !1) : r.current && !1 === e.data?.isPaused && (t.current = e.data?.context.uri,
                f(),
                t.current = void 0,
                r.current = !1)
            }
            ), [f]);
            (0,
            Ie.p)(je.gd.UPDATE, k)
        }
          , Ve = e => {
            Le(e),
            we(e)
        }
        ;
        var Me = n(48729);
        const Ue = () => {
            const e = (0,
            a.useRef)()
              , t = (0,
            a.useRef)(!1)
              , n = (0,
            a.useRef)(!1)
              , r = (0,
            o.wA)()
              , i = (0,
            o.d4)((e => e.ui.connectNudge.isOpen))
              , s = (0,
            o.d4)((e => e.ui.connectDevicePicker.isOpen))
              , c = (0,
            a.useCallback)(( () => {
                n.current && (clearTimeout(e.current),
                n.current = !1),
                r((0,
                Me.Yp)())
            }
            ), [r])
              , l = (0,
            a.useCallback)(( () => {
                n.current = !1,
                t.current || c()
            }
            ), [c])
              , u = (0,
            a.useCallback)(( () => {
                e.current = window.setTimeout(l, 8e3),
                r((0,
                Me.dK)()),
                n.current = !0
            }
            ), [r, l])
              , d = (0,
            a.useCallback)((e => {
                t.current = e,
                e || n.current || c()
            }
            ), [c]);
            return (0,
            a.useEffect)(( () => {
                s && c()
            }
            ), [s, c]),
            (0,
            a.useMemo)(( () => ({
                hideNudge: c,
                showNudge: u,
                setShouldKeepShowingNudge: d,
                isNudgeVisible: i
            })), [c, u, d, i])
        }
          , ze = e => {
            let {children: t, useNudgeTriggers: n=Ve, useToggleNudgeWithTimer: r=Ue, useCanShowNudge: i=fe, disabled: o=!1} = e;
            const {showNudge: s, hideNudge: c, setShouldKeepShowingNudge: l, isNudgeVisible: u} = r()
              , [d,m] = (0,
            a.useState)(null)
              , p = i();
            (0,
            a.useEffect)(( () => {
                u && !p && c()
            }
            ), [p, c, u]),
            n((e => !(u || !p) && (m(e),
            s(),
            !0)));
            const g = (0,
            a.useCallback)((e => {
                if (!e)
                    return (0,
                    x.jsx)(x.Fragment, {});
                return (0,
                x.jsx)(ye, {
                    onMouseEnter: () => l(!0),
                    onMouseLeave: () => l(!1),
                    ...e,
                    onClose: () => {
                        e?.onClose?.(),
                        c()
                    }
                })
            }
            ), [c, l]);
            return (0,
            x.jsx)(me.E, {
                isVisible: Boolean(d?.message) && u && !o,
                content: g(d),
                children: t
            })
        }
        ;
        var qe = n(720)
          , He = n(72664)
          , Ke = n(73525);
        const Ye = () => {
            const {remoteDeviceType: e, remoteDeviceIsGroup: t, connectionStatus: n} = (0,
            V.v)((e => {
                const t = (0,
                L.V)(e);
                return {
                    remoteDeviceType: t.remoteDevice?.type,
                    remoteDeviceIsGroup: t.remoteDevice?.isGroup,
                    connectionStatus: t.connectionStatus
                }
            }
            ), U.a)
              , r = (0,
            ue.g)()
              , {isActive: i} = (0,
            qe.AI)(He.Z.DevicePickerOverlay)
              , {canTogglePanel: o, isActive: s, togglePanel: l} = (0,
            de.C)()
              , {spec: u, logger: d} = (0,
            P.r)(ae.p, {})
              , m = (0,
            a.useCallback)(( () => {
                const {interactionId: e} = d.logInteraction(function(e, t, n) {
                    let a;
                    return a = t === D.zP.CONNECTING ? e.connectingButtonFactory() : t === D.zP.CONNECTED ? e.connectedButtonFactory() : e.notConnectedButtonFactory(),
                    n ? a.hitUiHide() : a.hitUiReveal()
                }(u, n, s));
                l(e)
            }
            ), [n, l, s, u, d])
              , {currentDevice: p} = (0,
            Ke.l)()
              , {isLocal: g} = p
              , v = (0,
            a.useMemo)(( () => (0,
            w.tf)(e, t, g ? r : null)), [r, g, t, e]);
            return (0,
            x.jsx)(ze, {
                children: (0,
                x.jsx)(le, {
                    isActive: s,
                    disabled: !o,
                    onToggle: m,
                    label: c.Ru.get("playback-control.connect-picker"),
                    icon: v,
                    restoreFocusKey: i ? He.Z.DevicePickerOverlay : He.Z.DevicePicker,
                    ariaDescribedby: ge
                })
            })
        }
          , Ge = () => {
            const {isAnonymous: e} = (0,
            o.d4)(v.Ht);
            return e ? null : (0,
            x.jsx)(Ye, {})
        }
        ;
        var We = n(1309)
          , Qe = n(97648)
          , Ze = n(90153)
          , Xe = n(58063)
          , $e = n(66921);
        const Je = e => {
            let {className: t="", disabledClassName: n="", onClick: r} = e;
            const o = (0,
            Xe.l)()
              , s = (0,
            y.o)((e => e?.hasContext ?? !1))
              , l = (0,
            Ze.l)()
              , u = !s
              , {toggleFullScreen: d, isInFullScreen: m} = (0,
            $e.H)({
                refOrElement: document.body,
                shouldWakeLockScreen: !0
            })
              , p = (0,
            a.useCallback)(( () => {
                const e = m ? W.z.CLOSED : W.z.NOW_PLAYING_VIEW;
                d(),
                setTimeout(( () => {
                    l(e)
                }
                ), 1)
            }
            ), [m, l, d])
              , g = (0,
            a.useCallback)((async () => {
                s && (r?.(!0),
                p())
            }
            ), [s, r, p])
              , v = m ? We.z : Qe.T
              , b = m ? c.Ru.get("web-player.cinema-mode.fullscreen.exit") : c.Ru.get("web-player.cinema-mode.fullscreen.enter")
              , h = i()(t, {
                [n]: u
            });
            return o ? (0,
            x.jsx)(le, {
                onToggle: g,
                className: h,
                icon: v,
                label: b,
                disabled: u,
                testId: "fullscreen-mode-button"
            }) : null
        }
          , et = (0,
        a.memo)(Je);
        var tt = n(95614)
          , nt = n(18831)
          , at = n(11829)
          , rt = n(7789)
          , it = n(3337);
        const ot = a.memo((e => {
            let {onClick: t, className: n, isActive: a, isEnabled: r} = e;
            const i = r ? c.Ru.get("web-player.lyrics.title") : c.Ru.get("web-player.lyrics.noLyrics1")
              , o = r ? t : void 0;
            return (0,
            x.jsx)(le, {
                className: n,
                isActive: a,
                onToggle: o,
                disabled: !r,
                label: i,
                testId: "lyrics-button",
                icon: tt.q
            })
        }
        ))
          , st = a.memo((e => {
            const t = Boolean((0,
            it.J)().data?.hasLyrics);
            return (0,
            x.jsx)(ot, {
                ...e,
                isEnabled: t,
                isActive: !1
            })
        }
        ))
          , ct = a.memo((e => {
            const t = (0,
            y.o)((e => e?.item?.uri))
              , n = Boolean((0,
            rt.f)(t).hasLyrics);
            return (0,
            x.jsx)(ot, {
                ...e,
                isEnabled: n,
                isActive: !1
            })
        }
        ))
          , lt = a.memo((e => {
            const t = (0,
            Q.S)()
              , {currentVariant: n} = (0,
            Z.r)()
              , {isActiveNotCinemaMode: a} = (0,
            at.$)()
              , {isAnonymous: r} = (0,
            o.d4)(v.Ht)
              , i = (0,
            G.NC)(J.khs)
              , s = (0,
            y.o)((e => {
                if (e?.item?.uri && (0,
                nt.U_m)(e?.item?.uri)) {
                    return !Boolean(e?.item?.metadata?.["segment.index"])
                }
                return !1
            }
            ));
            if (r || !s)
                return null;
            const c = t === W.z.NOW_PLAYING_VIEW && "lyrics" === n
              , l = a || c;
            return l ? (0,
            x.jsx)(ot, {
                ...e,
                isActive: l,
                isEnabled: !0
            }) : i ? (0,
            x.jsx)(st, {
                ...e
            }) : (0,
            x.jsx)(ct, {
                ...e
            })
        }
        ));
        var ut = n(85387)
          , dt = n(15594)
          , mt = n(25140);
        const pt = e => {
            let {onClick: t, className: n} = e;
            const a = (0,
            Q.S)()
              , {currentVariant: r, previousVariant: i} = (0,
            Z.r)()
              , o = (0,
            X.F)()
              , {toggleLyrics: s} = function(e) {
                let {referrer: t, onChange: n} = e;
                const a = (0,
                ut.Zp)()
                  , {isActive: r, routeDestination: i} = (0,
                at.$)()
                  , o = (0,
                mt.f)()
                  , s = () => {
                    r || (a(i, {
                        state: {
                            referrer: t
                        }
                    }),
                    n?.(r))
                }
                  , c = () => {
                    if (r) {
                        const e = "/"
                          , t = o.uri === dt.N6 ? e : (0,
                        nt.o_h)(o.uri)?.toURLPath(!0) ?? e;
                        a(t),
                        n?.(r)
                    }
                }
                ;
                return {
                    isActive: r,
                    showLyrics: s,
                    hideLyrics: c,
                    toggleLyrics: () => {
                        r ? c() : s()
                    }
                }
            }({
                onChange: t,
                referrer: "now_playing_bar"
            })
              , c = a === W.z.NOW_PLAYING_VIEW;
            return (0,
            x.jsx)(lt, {
                onClick: c ? () => {
                    o("lyrics" === r ? i ?? "artwork" : "lyrics")
                }
                : s,
                className: n
            })
        }
        ;
        var gt = n(61719)
          , vt = n(56572);
        const yt = vt.$S.NPV_BUTTON_CLICK
          , bt = e => {
            let {onClick: t} = e;
            const {isActive: n, panelSend: a} = (0,
            qe.AI)(He.Z.NowPlayingView)
              , r = (0,
            qe.Ev)(yt)
              , i = (0,
            G.NC)(J.ZDY)
              , o = (0,
            Q.S)()
              , s = (0,
            Ze.l)()
              , {item: l} = (0,
            y.o)((e => ({
                item: e?.item
            })), ( (e, t) => e.item?.uri === t.item?.uri))
              , u = !l || !r
              , d = o === W.z.NOW_PLAYING_VIEW;
            if (i)
                return null;
            const m = n && !d;
            return (0,
            x.jsx)(le, {
                isActive: m,
                disabled: u,
                onToggle: () => {
                    t?.(!n),
                    d ? ((0,
                    S.I)("NPV_OPEN_CINEMA_MODE_BUTTON"),
                    s(W.z.CLOSED),
                    n || a(yt)) : a(yt)
                }
                ,
                icon: gt.d,
                label: c.Ru.get("web-player.now-playing-view.label"),
                testId: "control-button-npv",
                restoreFocusKey: He.Z.NowPlayingView
            })
        }
        ;
        var ht = n(42029)
          , ft = n(95364)
          , Ct = n(36195)
          , kt = n(79525)
          , xt = n(69466);
        const Nt = [ft.fl.TRACKS, ft.fl.LOCAL_TRACKS, ft.fl.EPISODES]
          , jt = vt.$S.QUEUE_BUTTON_CLICK
          , At = e => {
            let {onClick: t} = e;
            const {isEnabled: n, isVisible: r} = ( () => {
                const {isAnonymous: e} = (0,
                o.d4)(v.Ht);
                return e ? {
                    isVisible: !1
                } : {
                    isVisible: !0,
                    isEnabled: !0
                }
            }
            )()
              , i = (0,
            qe.Ev)(jt)
              , {isActive: s} = (0,
            qe.AI)(He.Z.Queue, He.Z.QueueOverlay)
              , {toggleQueue: l} = (0,
            xt.R)()
              , u = (0,
            a.useCallback)(( () => {
                n && (t({
                    mode: "panel",
                    aboutToShow: !s
                }),
                l())
            }
            ), [n, t, s, l])
              , {className: d, dropPosition: m, ...p} = ( () => {
                const {openQueue: e} = (0,
                xt.R)()
                  , t = (0,
                Ae.z)()
                  , n = (0,
                a.useCallback)(( () => {
                    e()
                }
                ), [e])
                  , r = (0,
                a.useCallback)((e => {
                    const {[ft.fl.TRACKS]: n=[], [ft.fl.LOCAL_TRACKS]: a=[], [ft.fl.EPISODES]: r=[]} = e
                      , i = [...n, ...a, ...r];
                    t.addToQueue(i.map((e => ({
                        uri: e,
                        uid: null
                    }))))
                }
                ), [t]);
                return (0,
                kt.A)({
                    allowedMimeTypesByDropPosition: {
                        [Ct.Nz.ON]: Nt
                    },
                    onDrop: r,
                    onLongDragOver: n
                })
            }
            )();
            return r ? (0,
            x.jsx)("div", {
                className: d,
                ...p,
                children: (0,
                x.jsx)(le, {
                    icon: ht.j,
                    label: c.Ru.get("playback-control.queue"),
                    onToggle: u,
                    isActive: s,
                    disabled: !n || !i,
                    testId: "control-button-queue",
                    restoreFocusKey: He.Z.Queue
                })
            }) : null
        }
        ;
        var It = n(70133)
          , St = n(80065)
          , Tt = n(2216);
        const wt = e => {
            let {onClick: t} = e;
            const {item: n} = (0,
            St.L)() ?? {}
              , {isActive: a, onClick: r, showButton: i} = (0,
            Tt.D)({
                item: n,
                onClick: t
            });
            return n && i ? (0,
            x.jsx)(le, {
                isActive: a,
                onToggle: r,
                label: a ? c.Ru.get("miniplayer.close") : c.Ru.get("miniplayer.open"),
                icon: It.F,
                testId: "pip-toggle-button"
            }) : null
        }
        ;
        var Dt = n(54309)
          , Pt = n(92218);
        const Et = "mwpJrmCgLlVkJVtWjlI1"
          , Rt = "Xmv2oAnTB85QE4sqbK00"
          , Bt = "ExuDUBJ7bk8vT6INnm9F"
          , Ot = () => {
            const e = (0,
            G.NC)(J.L$q)
              , {spec: t, logger: n, UBIFragment: a} = (0,
            P.r)(ne.h9, {
                data: {
                    identifier: ne.gw.DESKTOP
                }
            })
              , r = (0,
            te.YQ)((e => {
                n.logInteraction(t.volumeBarFactory().dragSetVolume({
                    newVolumePercentage: Math.floor(100 * e)
                }))
            }
            ), 500, {
                leading: !1,
                trailing: !0
            });
            return (0,
            x.jsx)(a, {
                spec: t,
                children: (0,
                x.jsxs)("div", {
                    className: Et,
                    children: [(0,
                    x.jsx)(Pt.mA, {
                        onClick: () => {
                            n.logInteraction(t.djJumpButtonFactory().hitRefreshContent())
                        }
                    }), (0,
                    x.jsx)(bt, {
                        onClick: e => {
                            e ? n.logInteraction(t.npvButtonFactory().hitUiReveal()) : n.logInteraction(t.npvButtonFactory().hitUiHide())
                        }
                    }), e === J.vkU.CONTROL && (0,
                    x.jsx)(pt, {
                        className: Rt,
                        onClick: e => {
                            e ? n.logInteraction(t.lyricsButtonFactory().hitUiNavigateBack()) : n.logInteraction(t.lyricsButtonFactory().hitUiNavigate({
                                destination: "spotify:app:lyrics"
                            }))
                        }
                    }), (0,
                    x.jsx)(At, {
                        onClick: e => {
                            "main" === e.mode ? e.route ? n.logInteraction(t.queueButtonFactory().hitUiNavigate({
                                destination: e.route
                            })) : n.logInteraction(t.queueButtonFactory().hitUiNavigateBack()) : e.aboutToShow ? n.logInteraction(t.queueButtonFactory().hitUiReveal()) : n.logInteraction(t.queueButtonFactory().hitUiHide())
                        }
                    }), (0,
                    x.jsx)(Ge, {}), (0,
                    x.jsx)(Dt.M, {
                        className: Bt,
                        onVolumeBarClick: e => {
                            n.logInteraction(t.volumeBarFactory().hitSetVolume({
                                newVolumePercentage: Math.floor(100 * e)
                            }))
                        }
                        ,
                        onToggleMuteClick: e => {
                            "muted" === e ? n.logInteraction(t.volumeMuteButtonFactory().hitMutePlayback()) : "not_muted" === e && n.logInteraction(t.volumeMuteButtonFactory().hitUnmutePlayback())
                        }
                        ,
                        onVolumeBarDrag: r
                    }), (0,
                    x.jsx)(wt, {}), (0,
                    x.jsx)(et, {
                        className: "control-button",
                        disabledClassName: "control-button--disabled",
                        onClick: e => {
                            e && n.logInteraction(t.fullscreenButtonFactory().hitUiReveal())
                        }
                    })]
                })
            })
        }
        ;
        var _t = n(43039)
          , Ft = n(96744)
          , Lt = n(19151);
        const Vt = "yyrJTUPMeLS8qs1a0YJr"
          , Mt = e => {
            let {logoUrl: t} = e;
            return t ? (0,
            x.jsx)("div", {
                className: Vt,
                "data-testid": "context-ad-logo",
                children: (0,
                x.jsx)(Ft.N, {
                    loading: "eager",
                    imgSrc: t,
                    width: 56,
                    height: 56,
                    type: Lt.c.AD
                })
            }) : null
        }
        ;
        var Ut = n(12e3)
          , zt = n(29552)
          , qt = n(44463);
        const Ht = e => {
            let {item: t, context: n, index: a} = e;
            const {logoImage: r} = (0,
            Ut.b)(t);
            return (0,
            x.jsx)(qt.e, {
                item: t,
                context: n,
                index: a,
                "aria-label": c.Ru.get("ad-formats.advertisement"),
                adEventReason: zt.c.AD_LOGO,
                isVisible: !1,
                children: (0,
                x.jsx)(Mt, {
                    logoUrl: r
                })
            })
        }
        ;
        var Kt = n(20244)
          , Yt = n(19906);
        const Gt = a.memo((function(e) {
            let {uri: t, className: n, onClick: r, size: i=Kt.t.xs} = e;
            const [o,s] = (0,
            Yt.A)(t)
              , c = (0,
            a.useCallback)((e => {
                e.preventDefault(),
                r && r(!o),
                s(!o)
            }
            ), [o, r, s]);
            return (0,
            x.jsx)(Kt.M, {
                className: n,
                size: i,
                onClick: c,
                isAdded: !!o,
                condensed: !0
            })
        }
        ));
        var Wt = n(91546)
          , Qt = n(59375)
          , Zt = n(28153);
        const Xt = e => {
            let {uri: t, isBook: n=!1, size: r=Kt.t.xs, className: i, onClick: o} = e;
            const {isPreSaved: s, addPresave: c, removePresave: l} = (0,
            Zt.w)({
                uri: t,
                isBook: n
            })
              , u = (0,
            a.useCallback)(( () => {
                s ? l() : c(),
                o?.(!s)
            }
            ), [s, o, l, c]);
            return (0,
            x.jsx)(Kt.M, {
                className: i,
                size: r,
                onClick: u,
                isAdded: !!s,
                condensed: !0
            })
        }
        ;
        var $t = n(19672)
          , Jt = n(30254)
          , en = n(69812)
          , tn = n(81952)
          , nn = n(35054)
          , an = n(37673)
          , rn = n(37861)
          , on = n(92019)
          , sn = n(27847)
          , cn = n(90471)
          , ln = n(29425);
        function un(e) {
            return (0,
            ln.v)(e) || (0,
            cn.p)(e)
        }
        const dn = vt.$S.NPV_BUTTON_CLICK
          , mn = () => {
            const e = (0,
            Ze.l)()
              , t = (0,
            G.NC)(J.wZE)
              , n = (0,
            Q.S)()
              , r = (0,
            qe._Y)();
            return (0,
            a.useCallback)(( () => {
                n === W.z.CLOSED ? t ? e(W.z.NOW_PLAYING_VIEW) : r(dn) : e(W.z.CLOSED)
            }
            ), [t, n, r, e])
        }
        ;
        var pn = n(65758)
          , gn = n(26562)
          , vn = n(68293)
          , yn = n(72115);
        const bn = e => {
            let {spec: t} = e;
            const n = (0,
            vn.s)()
              , r = (0,
            St.L)()
              , {draggable: i, onDragStart: o} = (0,
            gn.P)()
              , s = (0,
            Q.S)()
              , l = mn()
              , {images: u} = (0,
            pn.u)(r?.item)
              , d = s === W.z.NOW_PLAYING_VIEW
              , m = (0,
            a.useCallback)(( () => {
                l();
                const e = d ? t.hitUiHide() : t.hitUiReveal();
                n.logInteraction(e)
            }
            ), [d, n, t, l]);
            if (null === r)
                return null;
            const {context: p, item: g} = r;
            return (0,
            x.jsx)(nn.h, {
                menu: (0,
                x.jsx)(rn.W, {
                    context: p,
                    item: g
                }),
                children: (0,
                x.jsx)("div", {
                    draggable: i && un(g),
                    onDragStart: e => {
                        o(e, {
                            itemUris: [g.uri],
                            dragLabelText: (0,
                            sn.r)(g)
                        })
                    }
                    ,
                    children: (0,
                    x.jsx)(on.R, {
                        uri: p.uri,
                        owner: p.metadata?.context_owner,
                        children: (0,
                        x.jsx)("button", {
                            type: "button",
                            "data-testid": "cover-art-button",
                            className: yn.A.coverArtButton,
                            "aria-label": c.Ru.get("web-player.now-playing-view.label"),
                            onClick: m,
                            children: (0,
                            x.jsx)(an.b, {
                                images: u,
                                type: g.type,
                                size: 56,
                                maxSize: 56,
                                className: yn.A.coverArt
                            })
                        })
                    })
                })
            })
        }
        ;
        var hn = n(83498)
          , fn = n(96573)
          , Cn = n(27689)
          , kn = n(87338);
        const xn = "GQ5_gIWzIqAfBdmQm8yJ"
          , Nn = "_9sCL61nGvQFXv2u02jXw"
          , jn = vt.$S.NPV_BUTTON_CLICK
          , An = e => {
            let {children: t, className: n, spec: r} = e;
            const o = (0,
            vn.s)()
              , s = (0,
            qe.Ev)(jn)
              , l = (0,
            Q.S)()
              , {isActive: u} = (0,
            qe.AI)(He.Z.NowPlayingView)
              , d = (0,
            G.NC)(J.wZE)
              , m = mn()
              , p = (0,
            a.useMemo)(( () => {
                if (d) {
                    const e = l === W.z.NOW_PLAYING_VIEW;
                    return {
                        label: e ? c.Ru.get("web-player.cinema-mode.minimize") : c.Ru.get("web-player.now-playing-view.cinema-mode.expand"),
                        Icon: e ? hn.b : fn.L,
                        isActive: e,
                        isDisabled: !1
                    }
                }
                return {
                    label: u ? c.Ru.get("npb.collapseCoverArt") : c.Ru.get("npb.expandCoverArt"),
                    Icon: u ? Cn.r : kn.o,
                    isActive: u,
                    isDisabled: !s
                }
            }
            ), [d, s, l, u])
              , g = (0,
            a.useCallback)(( () => {
                m();
                const e = r.coverartArrowFactory()
                  , t = p.isActive ? e.hitUiHide() : e.hitUiReveal();
                o.logInteraction(t)
            }
            ), [o, r, p.isActive, m]);
            return (0,
            x.jsxs)("div", {
                "data-testid": "CoverSlotCollapsed__container",
                className: i()(xn, n),
                children: [t, (0,
                x.jsx)(ie.Zp, {
                    label: p.label,
                    children: (0,
                    x.jsx)("button", {
                        className: i()(Nn),
                        disabled: p.isDisabled,
                        onClick: g,
                        "aria-label": p.label,
                        "aria-pressed": p.isActive,
                        children: (0,
                        x.jsx)(p.Icon, {
                            iconSize: 16
                        })
                    })
                })]
            })
        }
        ;
        var In = n(85397)
          , Sn = n(36999)
          , Tn = n(56491);
        var wn = n(80329)
          , Dn = n(64589)
          , Pn = n(62138)
          , En = n(33361)
          , Rn = n(86541)
          , Bn = n(52593)
          , On = n(52613)
          , _n = n(52887)
          , Fn = n(89457)
          , Ln = n(23291)
          , Vn = n(1287);
        const Mn = e => {
            let {context: t, item: n, onLike: a} = e;
            const r = (0,
            En.X)()
              , i = (0,
            Pn.C)()
              , o = (0,
            Jt.v)(n);
            if (r && i && (0,
            Dn.N)(n))
                return (0,
                x.jsx)(wn.o, {
                    contextUri: n.metadata?.context_uri ?? t.uri,
                    id: n.uid ?? void 0,
                    uri: n.uri,
                    isActive: !0
                });
            if (o)
                return (0,
                x.jsx)($t.g, {
                    uri: n.uri,
                    condensed: !0
                });
            if ((0,
            ln.v)(n))
                return n.isLocal ? null : (0,
                x.jsx)(Qt.b, {
                    uri: n.uri,
                    className: "control-button control-button-heart",
                    onClick: a
                });
            if ((0,
            cn.p)(n))
                return (0,
                x.jsx)(Wt.b, {
                    condensed: !0,
                    uri: n.uri,
                    className: "control-button control-button-heart",
                    onClick: a
                });
            if ((0,
            _n.d)(n)) {
                return "trailer" === n?.metadata?.type && "true" === n?.metadata?.is_pre_release ? (0,
                x.jsx)(Xt, {
                    uri: n.book.uri,
                    isBook: !0,
                    className: "control-button control-button-heart",
                    onClick: a
                }) : (0,
                x.jsx)(Gt, {
                    uri: n.book.uri,
                    className: "control-button control-button-heart",
                    onClick: a
                })
            }
            return (0,
            On.N)(n) || (0,
            Fn.v)(n) ? null : (0,
            Vn.d)(n)
        }
          , Un = e => {
            let {state: {item: t, context: n, index: r}} = e;
            !function(e) {
                const t = (0,
                Tn.i)()
                  , n = (0,
                Sn.X)(e);
                (0,
                a.useEffect)(( () => {
                    n && t.say(n)
                }
                ), [n, t])
            }(t);
            const {videoPlayerMode: i, setVideoPlayerUIFlag: o} = (0,
            Rn.d)()
              , {spec: s, logger: c} = (0,
            P.r)(_t.p6, {
                data: {
                    identifier: _t.gw.DESKTOP
                }
            })
              , l = (0,
            Sn.P)(t)
              , u = (0,
            G.NC)(J.WAA);
            (0,
            a.useEffect)(( () => {
                o(Bn.nP.nowPlayingBar, u)
            }
            ), [u, o]);
            const d = i === Bn.Kz.nowPlayingBar && u
              , m = (0,
            a.useMemo)(( () => s.coverartFactory({
                uri: t.uri
            })), [t.uri, s]);
            return (0,
            x.jsx)(a.Suspense, {
                fallback: null,
                children: (0,
                x.jsx)("div", {
                    "data-testid": "now-playing-widget",
                    className: yn.A.nowPlaying,
                    role: "region",
                    "aria-label": l,
                    children: (0,
                    x.jsxs)(Ln.r, {
                        spec: s,
                        children: [(0,
                        On.N)(t) ? (0,
                        x.jsx)(Ht, {
                            item: t,
                            context: n,
                            index: r
                        }) : (0,
                        x.jsxs)(An, {
                            className: yn.A.coverArtCollapsed,
                            spec: m,
                            children: [!d && (0,
                            x.jsx)(bn, {
                                spec: m
                            }), u && (0,
                            x.jsx)("div", {
                                id: "VideoPlayerNpb_ReactPortal"
                            })]
                        }), (0,
                        x.jsx)(en.d, {
                            context: n,
                            className: yn.A.contextItemInfo,
                            item: t,
                            size: "xsmall",
                            enableVideoButton: !0,
                            onTitleClick: e => {
                                c.logInteraction(s.titleFactory({
                                    uri: t.uri
                                }).hitUiNavigate({
                                    destination: e || ""
                                }))
                            }
                            ,
                            onSubtitleClick: e => {
                                c.logInteraction(s.subtitleFactory({
                                    uri: t.uri
                                }).hitUiNavigate({
                                    destination: e || ""
                                }))
                            }
                            ,
                            referrer: tn.G.NPB
                        }), (0,
                        x.jsxs)("div", {
                            className: yn.A.controls,
                            children: [(0,
                            x.jsx)(In.a, {
                                context: n,
                                item: t,
                                onClick: () => {
                                    c.logInteraction(s.hideButtonFactory().hitRemoveRecommendation({
                                        recommendedItemUri: t.uri,
                                        contextUri: n.uri
                                    }))
                                }
                            }), (0,
                            x.jsx)(Mn, {
                                item: t,
                                onLike: e => {
                                    c.logInteraction(e ? s.likeButtonFactory({
                                        uri: t.uri
                                    }).hitLike({
                                        itemToBeLiked: t.uri
                                    }) : s.likeButtonFactory({
                                        uri: t.uri
                                    }).hitRemoveLike({
                                        itemNoLongerLiked: t.uri
                                    }))
                                }
                                ,
                                context: n
                            })]
                        })]
                    })
                })
            })
        }
          , zn = () => {
            const e = (0,
            St.L)();
            return null === e ? (0,
            x.jsx)("div", {
                className: i()("now-playing")
            }) : (0,
            x.jsx)(Un, {
                state: e
            })
        }
        ;
        var qn = n(39418);
        const Hn = "aguQsGoZR9wZeawKGdDh"
          , Kn = "ieqOSqJb6kk3bG5XDOHk"
          , Yn = e => {
            let {paused: t, fromSeconds: n} = e;
            const [r,i] = (0,
            a.useState)(n);
            return (0,
            qn.$)((e => {
                i((n => t ? n : n > 0 ? n - 1 : (e(),
                n)))
            }
            ), 1e3),
            (0,
            x.jsxs)("div", {
                className: Hn,
                children: [c.Ru.get("ad-formats.skippable_ads.skip_countdown"), (0,
                x.jsx)("span", {
                    className: Kn,
                    children: r
                })]
            })
        }
        ;
        var Gn = n(36991);
        const Wn = e => {
            let {children: t} = e;
            const n = (0,
            y.o)((e => e), ( (e, t) => (0,
            U.a)(e?.restrictions, t?.restrictions) && e?.item?.uri === t?.item?.uri && e?.isPaused === t?.isPaused))
              , a = n?.restrictions.disallowSkippingNextReasons.includes("ad_disallow")
              , r = n?.isPaused ?? !1
              , i = (0,
            Gn.qc)(n)
              , s = (0,
            Gn.Tv)(n)
              , c = (0,
            o.d4)((e => i ? e?.ads?.audio?.info?.skippableAdDelaySeconds : s ? e?.ads?.vto?.info?.skippableAdDelaySeconds : void 0));
            return a && c ? (0,
            x.jsx)(Yn, {
                paused: !!r,
                fromSeconds: c
            }) : (0,
            x.jsx)(x.Fragment, {
                children: t
            })
        }
        ;
        var Qn = n(90238)
          , Zn = n(93844);
        var Xn = n(63181)
          , $n = n(19239);
        const Jn = e => {
            const [t,n] = (0,
            a.useState)(new Map)
              , [r,i] = (0,
            a.useState)()
              , o = (0,
            Xn.L)()
              , s = (0,
            Zn.mr)()
              , {currentDevice: c} = (0,
            Ke.l)()
              , l = (0,
            $n.vh)()
              , u = (0,
            a.useCallback)(( () => {
                if (!e)
                    return;
                const a = (e => {
                    let {lastRecordedItem: t, setLastRecordedItem: n, recentAds: a, setRecentAds: r, playerStateItem: i, currentDevice: o} = e
                      , s = {
                        isMissingAdData: !1
                    };
                    if (i && i.uri !== t?.uri) {
                        if (t?.type === Lt.c.AD) {
                            const e = t?.uri.split(":")[2];
                            e && a.has(e) ? r((t => {
                                const n = new Map(t);
                                return n.delete(e),
                                n
                            }
                            )) : s = {
                                isMissingAdData: !0,
                                errorMessage: o.isLocal ? "primary_device" : "secondary_device",
                                adId: e
                            }
                        }
                        n(( () => i))
                    }
                    return s
                }
                )({
                    lastRecordedItem: r,
                    setLastRecordedItem: i,
                    recentAds: t,
                    setRecentAds: n,
                    playerStateItem: o?.item,
                    currentDevice: c
                });
                if (a.isMissingAdData) {
                    const {errorMessage: e, adId: t} = a;
                    l.send((0,
                    Qn.G)({
                        error_type: "missing_ad_data",
                        error_message: e,
                        slot: "stream",
                        ad_id: t
                    }))
                }
            }
            ), [o, r, t, l, c, e])
              , d = (0,
            a.useCallback)(( () => {
                e && s && n((e => {
                    let n = e;
                    return t.has(s.adId) || (n = new Map(e).set(s.adId, s)),
                    n
                }
                ))
            }
            ), [t, s, e]);
            (0,
            a.useEffect)(( () => {
                u()
            }
            ), [u]),
            (0,
            a.useEffect)(( () => {
                d()
            }
            ), [d])
        }
        ;
        var ea = n(17161)
          , ta = n(64559)
          , na = n(85272)
          , aa = n(53627)
          , ra = n(48671)
          , ia = n(23009)
          , oa = n(21771)
          , sa = n(98859)
          , ca = n(45549)
          , la = n(16068);
        const ua = "gItY2hnfCB4TsDJCkPiO"
          , da = "XrZ1iHVHAPMya3jkB2sa"
          , ma = "NKUrT1GciYXAEEUtagN1"
          , pa = "Qt226Z4rBQs53aedRQBQ"
          , ga = (0,
        a.memo)((function(e) {
            let {item: t} = e;
            const n = aa.Q.isPodcastAd(t)
              , a = aa.Q.isSurveyAd(t);
            return (0,
            x.jsxs)("div", {
                "data-testid": "ad-controls",
                className: da,
                children: [(0,
                x.jsxs)("div", {
                    className: ma,
                    children: [n && (0,
                    x.jsx)(la.w, {}), (0,
                    x.jsx)(na.T, {
                        item: t,
                        isDisabled: a
                    }), n ? (0,
                    x.jsx)(ia.h, {}) : (0,
                    x.jsx)(sa.d, {})]
                }), (0,
                x.jsx)(ra.x, {}), (0,
                x.jsxs)("div", {
                    className: pa,
                    children: [n ? (0,
                    x.jsx)(oa.v, {}) : (0,
                    x.jsx)(Wn, {
                        children: (0,
                        x.jsx)(ca.$, {})
                    }), (0,
                    x.jsx)(ta.t, {
                        item: t,
                        isDisabled: a
                    })]
                })]
            })
        }
        ));
        var va = n(35451)
          , ya = n(78634);
        var ba = n(30317)
          , ha = n(42681)
          , fa = n(68888);
        var Ca = n(89809)
          , ka = n(86223)
          , xa = n(69444)
          , Na = (n(77369),
        n(28718))
          , ja = n(54542)
          , Aa = n(17683)
          , Ia = n(46235)
          , Sa = n(43529);
        const Ta = "mkROcxw9LM6F2uuwQYjN"
          , wa = "lS8fuNpwL8OBGhloXNdh"
          , Da = "iAOrGKFACLqwN5OOPDOt"
          , Pa = "x7x6PBvBMU9lusyUfedS"
          , Ea = function(e) {
            let {setSleepTimer: t, state: n, formattedTimeLeft: a} = e;
            const {item: r} = (0,
            Xn.L)() ?? {}
              , i = n.type === Sa.dq.NONE ? Sa.Xe : Sa.Xe.concat(Sa.k1.Off)
              , o = n.type !== Sa.dq.NONE && n.timestamp ? c.Ru.get("web-player.sleep-timer.player-controls.popover.title.timeleft", a) : c.Ru.get("web-player.sleep-timer.player-controls.popover.title")
              , s = e => () => t(e);
            return (0,
            x.jsxs)(Na.W, {
                "aria-label": o,
                children: [(0,
                x.jsx)(ja.y, {
                    className: wa,
                    children: (0,
                    x.jsx)("span", {
                        className: Da,
                        children: o
                    })
                }), i.map((e => {
                    const t = (0,
                    Ia.I)(e, r?.type ?? Lt.c.EPISODE);
                    return (0,
                    x.jsx)(Aa.D, {
                        onClick: s(e),
                        "data-testid": `playback-sleep-timer-option-${e}`,
                        role: "menuitemradio",
                        "aria-label": t,
                        children: t
                    }, e)
                }
                ))]
            })
        };
        var Ra = n(46580)
          , Ba = n(7381)
          , Oa = n(25669)
          , _a = n(31159);
        let Fa = function(e) {
            return e[e.DEACTIVATED = 0] = "DEACTIVATED",
            e[e.ACTIVATED = 1] = "ACTIVATED",
            e
        }({});
        const La = "scale(0.97)"
          , Va = {
            [Fa.DEACTIVATED]: {
                Icon: Ba.l,
                transitions: {
                    [Fa.ACTIVATED]: {
                        animationFilePath: (0,
                        Oa.bj)("animations/stopwatch_activate.json"),
                        style: {
                            transform: La
                        }
                    }
                }
            },
            [Fa.ACTIVATED]: {
                Icon: e => {
                    const {className: t, ...n} = e;
                    return (0,
                    x.jsx)("span", {
                        className: Ta,
                        children: (0,
                        x.jsx)(_a.x, {
                            className: i()(t),
                            ...n
                        })
                    })
                }
                ,
                transitions: {
                    [Fa.DEACTIVATED]: {
                        animationFilePath: (0,
                        Oa.bj)("animations/stopwatch_deactivate.json"),
                        style: {
                            transform: La
                        }
                    },
                    [Fa.ACTIVATED]: {
                        animationFilePath: (0,
                        Oa.bj)("animations/stopwatch_activate.json"),
                        style: {
                            transform: La
                        }
                    }
                }
            }
        };
        var Ma = n(27958)
          , Ua = n(9131);
        const za = e => Math.max(0, e - Date.now())
          , qa = e => {
            let {uri: t, onClick: n} = e;
            const r = (0,
            G.NC)(J.GhO)
              , i = (0,
            Ae.z)()
              , [o,s] = (0,
            Ra.y)()
              , l = o.type !== Sa.dq.NONE
              , {timestamp: u} = o
              , [d,m] = (0,
            a.useState)(( () => u ? za(u) : 0))
              , {logger: p, spec: g} = (0,
            P.r)(Ca.h, {
                data: {
                    uri: t
                }
            })
              , v = (0,
            a.useMemo)(( () => u ? (0,
            Ua.f)(d) : ""), [d, u])
              , {setState: y, Icon: h} = (0,
            Ma.Q)(l ? Fa.ACTIVATED : Fa.DEACTIVATED, Va)
              , f = (0,
            a.useCallback)((e => {
                s(e),
                n?.(e),
                y(e === Sa.k1.Off ? Fa.DEACTIVATED : Fa.ACTIVATED);
                const a = (0,
                Ia.p)(e, g, t);
                p.logInteraction(a)
            }
            ), [s, n, y, g, t, p]);
            if ((0,
            a.useEffect)(( () => {
                if (!u)
                    return void m(0);
                const e = () => m(za(u));
                e();
                const t = setInterval(e, 1e3);
                return () => {
                    clearInterval(t)
                }
            }
            ), [u]),
            !r)
                return null;
            const C = c.Ru.get("web-player.sleep-timer.player-controls.button.tooltip")
              , k = l && v ? `${C} - ${c.Ru.get("web-player.sleep-timer.player-controls.popover.title.timeleft", v)}` : C
              , N = l && u
              , j = i.getCapabilities().canUseSleepTimer;
            return (0,
            x.jsx)(ka.t, {
                placement: "top-start",
                menu: (0,
                x.jsx)(Ea, {
                    state: o,
                    setSleepTimer: f,
                    formattedTimeLeft: v
                }),
                children: (e, t, n) => {
                    const a = (0,
                    x.jsx)(re.H, {
                        ref: n,
                        iconLeading: h,
                        size: "small",
                        onClick: j ? t : void 0,
                        role: "checkbox",
                        "aria-label": k,
                        "data-testid": "control-button-sleep-timer",
                        "aria-checked": l,
                        semanticColor: l ? "textBrightAccent" : void 0,
                        children: N && (0,
                        x.jsx)(b.E, {
                            variant: "marginal",
                            semanticColor: "textBrightAccent",
                            className: Pa,
                            children: v
                        })
                    });
                    return (0,
                    x.jsx)(ie.Zp, {
                        label: C,
                        children: j ? a : (0,
                        x.jsx)(xa.$, {
                            type: "sleep-timer",
                            children: a
                        })
                    })
                }
            })
        }
        ;
        var Ha = n(8578)
          , Ka = n(82719);
        const Ya = (0,
        a.memo)((function(e) {
            let {isPreview: t} = e;
            const {logChangePlaybackSpeed: n, logChangeRepeatMode: r, logChangeShuffleMode: i, logSeekForward: o, logSeekBack: s, logSkipForward: l, logSkipBack: u, logPlayPause: d, logProgressChanged: m, spec: p} = ( () => {
                const e = (0,
                Ae.z)()
                  , {spec: t, logger: n} = (0,
                P.r)(ba.kD, {
                    data: {
                        identifier: ba.gw.DESKTOP
                    }
                });
                return {
                    logChangePlaybackSpeed: (0,
                    a.useCallback)((a => {
                        const r = e.getState();
                        r?.item && n.logInteraction(t.speedControlButtonFactory().hitSetPlaybackSpeed({
                            currentlyPlayedItem: r.item.uri,
                            playbackSpeed: a
                        }))
                    }
                    ), [n, e, t]),
                    logChangeShuffleMode: (0,
                    a.useCallback)((e => {
                        n.logInteraction(e ? t.shuffleButtonFactory().hitShuffleEnable() : t.shuffleButtonFactory().hitShuffleDisable())
                    }
                    ), [n, t]),
                    logChangeRepeatMode: (0,
                    a.useCallback)((e => {
                        const a = {
                            [ha.p.REPEAT_NONE]: t.repeatButtonFactory().hitRepeatDisable(),
                            [ha.p.REPEAT_TRACK]: t.repeatButtonFactory().hitRepeatOneEnable(),
                            [ha.p.REPEAT_CONTEXT]: t.repeatButtonFactory().hitRepeatEnable()
                        };
                        n.logInteraction(a[e])
                    }
                    ), [n, t]),
                    logSeekBack: (0,
                    a.useCallback)((e => {
                        n.logInteraction(t.seekBackButtonFactory().hitSeekByTime({
                            msSeekedOffset: e
                        }))
                    }
                    ), [n, t]),
                    logSeekForward: (0,
                    a.useCallback)((e => {
                        n.logInteraction(t.seekForwardButtonFactory().hitSeekByTime({
                            msSeekedOffset: e
                        }))
                    }
                    ), [n, t]),
                    logSkipBack: (0,
                    a.useCallback)(( () => {
                        const a = e.getState();
                        a && n.logInteraction(t.previousButtonFactory().hitSkipToPrevious({
                            itemToBeSkipped: a.item?.uri || "",
                            positionMs: (0,
                            fa.s)(a) ?? -1,
                            totalContentMs: a.duration ?? -1
                        }))
                    }
                    ), [n, e, t]),
                    logSkipForward: (0,
                    a.useCallback)(( () => {
                        const a = e.getState();
                        a?.item && n.logInteraction(t.nextButtonFactory().hitSkipToNext({
                            itemToBeSkipped: a.item.uri,
                            positionMs: (0,
                            fa.s)(a) ?? -1,
                            totalContentMs: a.duration ?? -1
                        }))
                    }
                    ), [n, e, t]),
                    logPlayPause: (0,
                    a.useCallback)((a => {
                        const r = e.getState();
                        r?.item && ("resume" === a ? n.logInteraction(t?.playPauseButtonFactory().hitResume({
                            itemToBeResumed: r.item.uri
                        })) : "pause" === a && n.logInteraction(t?.playPauseButtonFactory().hitPause({
                            itemToBePaused: r.item.uri
                        })))
                    }
                    ), [n, e, t]),
                    logProgressChanged: (0,
                    a.useCallback)(( (e, a) => {
                        switch (a) {
                        case "drag":
                            return n.logInteraction(t.progressBarFactory().dragSeekToTime({
                                msToSeekTo: e
                            }));
                        case "hit":
                            return n.logInteraction(t.progressBarFactory().hitSeekToTime({
                                msToSeekTo: e
                            }));
                        default:
                            return (0,
                            Vn.k)(a)
                        }
                    }
                    ), [n, t]),
                    spec: t
                }
            }
            )();
            Jn((0,
            G.NC)(J.KYh));
            const g = (0,
            y.o)((e => e?.item ?? void 0), ( (e, t) => e?.uri === t?.uri))
              , v = function() {
                const e = (0,
                y.o)((e => e?.item ?? void 0), ( (e, t) => e?.uri === t?.uri));
                return (0,
                cn.p)(e) || (0,
                _n.d)(e) ? "audio" === e.mediaType || "mixed" === e.mediaType : !!(0,
                On.N)(e) && e.isPodcastAd
            }();
            return (0,
            x.jsx)("div", {
                className: ua,
                "data-testid": "player-controls",
                dir: "ltr",
                "aria-label": c.Ru.get("playback-control.a11y.landmark-label"),
                children: (0,
                x.jsxs)(Ln.r, {
                    spec: p,
                    children: [(0,
                    On.N)(g) ? (0,
                    x.jsx)(ga, {
                        item: g
                    }) : (0,
                    x.jsxs)("div", {
                        className: da,
                        "data-testid": "general-controls",
                        children: [(0,
                        x.jsxs)("div", {
                            className: ma,
                            children: [v ? (0,
                            x.jsx)(la.w, {
                                onClick: n
                            }) : (0,
                            x.jsx)(Ka.w, {
                                renderEnabled: () => (0,
                                x.jsx)(Ha.a, {
                                    size: "small"
                                }),
                                renderDisabled: () => (0,
                                x.jsx)(ya.u, {
                                    onClick: i
                                })
                            }), v && (0,
                            x.jsx)(ia.h, {
                                onClick: s
                            }), (0,
                            x.jsx)(sa.d, {
                                onClick: u
                            })]
                        }), (0,
                        x.jsx)(ra.x, {
                            onClick: d
                        }), (0,
                        x.jsxs)("div", {
                            className: pa,
                            children: [(0,
                            x.jsx)(Wn, {
                                children: (0,
                                x.jsx)(ca.$, {
                                    onClick: l
                                })
                            }), v ? (0,
                            x.jsxs)(x.Fragment, {
                                children: [(0,
                                x.jsx)(oa.v, {
                                    onClick: o
                                }), (0,
                                x.jsx)(qa, {
                                    uri: g?.uri ?? ""
                                })]
                            }) : (0,
                            x.jsx)(va.s, {
                                onClick: r
                            })]
                        })]
                    }), (0,
                    x.jsx)(ea.x, {
                        isPreview: t,
                        onChange: m
                    })]
                })
            })
        }
        ));
        var Ga = n(86247)
          , Wa = n(37311)
          , Qa = n(56627);
        const Za = "yglmI5m3fCc8baD1Kwdw"
          , Xa = "udArIAqnfUQPQew2VAns"
          , $a = "MWD1i_CSJ5N9wRBDpZmX"
          , Ja = "k3NVrHXkbfflNdAxpT1_"
          , er = "m8UPWsNtWbdkvBNvqgBN"
          , tr = "aepuRyT82biv_XmkH1eS"
          , nr = "snFK6_ei0caqvFI6As9Q"
          , ar = "sVv2OQORCQ4kf6iKfUTF"
          , rr = "pLifNBuHRY8cZkZyEqwL"
          , ir = "K7b2iysmIbvKo8RqRbc5"
          , or = "adzMqeRxU0__wQcuju5q"
          , sr = (0,
        a.memo)(( () => {
            const {isAnonymous: e} = (0,
            o.d4)(v.Ht)
              , t = (0,
            o.wA)()
              , n = (0,
            y.o)((e => e), ( (e, t) => e?.hasContext === t?.hasContext && e?.item?.uri === t?.item?.uri))
              , r = (0,
            j.h)();
            ( () => {
                const e = (0,
                o.d4)(v.Yb)
                  , {mode: t, setMode: n} = (0,
                $.r)()
                  , r = (0,
                a.useRef)(void 0)
                  , i = (0,
                y.o)((e => e?.item?.uri))
                  , s = (0,
                G.NC)(J.L$q)
                  , c = (0,
                Q.S)()
                  , l = (0,
                Z.r)()
                  , u = (0,
                X.F)()
                  , d = c === W.z.NOW_PLAYING_VIEW && "lyrics" === l.currentVariant;
                (0,
                a.useEffect)(( () => {
                    r.current && t !== ee.YU.none && r.current !== i && (e || s === J.vkU.REDUCED_VISIBILITY) && (t === ee.YU.npv && n(ee.YU.static),
                    d && u(l.previousVariant ?? "artwork")),
                    r.current = i
                }
                ), [l.previousVariant, e, d, s, t, u, n, i])
            }
            )();
            const b = (0,
            y.o)((e => (0,
            On.N)(e?.item ?? void 0)));
            ( () => {
                const e = (0,
                a.useRef)(null)
                  , t = (0,
                a.useRef)(!1)
                  , n = (0,
                o.wA)()
                  , r = (0,
                o.d4)(d.qn)
                  , i = (0,
                o.d4)(v.Um)
                  , s = (0,
                y.o)((e => e?.context.uri), ( (e, t) => e === t));
                (0,
                a.useEffect)(( () => {
                    const a = e.current
                      , o = a && (0,
                    p.Z_)(r ?? [], a, 2)
                      , c = s && (0,
                    p.Z_)(r ?? [], s, 2);
                    a !== s && (o || c) && i && m.adsCoreConnector.clearSlot(g.r.stream),
                    c !== t.current && (n((0,
                    u.uM)(!!c)),
                    t.current = !!c),
                    e.current = s ?? null
                }
                ), [s, r, i, n])
            }
            )();
            const h = (0,
            a.useCallback)((e => {
                e.stopPropagation(),
                t((0,
                l.Ai)())
            }
            ), [t])
              , f = () => (0,
            x.jsx)(Ga.ql.Provider, {
                value: "now_playing_bar",
                children: (0,
                x.jsxs)("div", {
                    className: e ? $a : Xa,
                    children: [(0,
                    x.jsx)("div", {
                        className: nr,
                        children: (0,
                        x.jsx)(zn, {})
                    }), (0,
                    x.jsx)("div", {
                        className: ar,
                        children: (0,
                        x.jsx)(a.Suspense, {
                            fallback: null,
                            children: (0,
                            x.jsx)(Ya, {
                                isPreview: e
                            })
                        })
                    }), (0,
                    x.jsx)("div", {
                        className: rr,
                        children: (0,
                        x.jsx)(Ot, {})
                    })]
                })
            });
            return (0,
            x.jsx)(Qa.P, {
                surface: Wa.u.NOW_PLAYING,
                children: (0,
                x.jsxs)("aside", {
                    "aria-label": c.Ru.get("playback-control.a11y.now-playing-bar-landmark-label"),
                    className: i()(Za, ir, {
                        [or]: r
                    }),
                    "data-testid": "now-playing-bar",
                    "data-testadtype": "ad-type-" + (b ? "ad" : "none"),
                    children: [e ? (0,
                    x.jsx)(N, {
                        handleClick: h
                    }) : null, e ? (0,
                    x.jsx)(s.A, {
                        in: n?.hasContext ?? !1,
                        timeout: 200,
                        classNames: {
                            enter: Ja,
                            enterActive: er,
                            enterDone: tr
                        },
                        children: f()
                    }) : f(), (0,
                    x.jsx)(Y, {})]
                })
            })
        }
        ))
    }
}]);
//# sourceMappingURL=dwp-now-playing-bar.d96075f7.js.map
