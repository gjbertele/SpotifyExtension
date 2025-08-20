"use strict";
(("undefined" != typeof self ? self : global).webpackChunkclient_web = ("undefined" != typeof self ? self : global).webpackChunkclient_web || []).push([[352, 7125, 9319], {
    2030: (e, s, t) => {
        t.d(s, {
            PageErrorTemplate: () => x
        });
        var a = t(30758)
          , r = t(85387)
          , i = t(8859)
          , n = t(94378)
          , o = t(20746)
          , l = t(37899)
          , c = t(73136)
          , d = t(20304)
          , u = t(70397)
          , p = t(61315)
          , h = t(84409);
        const m = "fFv7yCuLuIO1dAGZHcVf";
        var y = t(86070);
        const g = {
            "/": i.H,
            "/search": n.C,
            "/collection": o.M
        }
          , x = a.memo((function() {
            const e = (0,
            r.zy)()
              , s = (t = e.pathname,
            g[t] || l.b);
            var t;
            const {spec: i, logger: n} = (0,
            h.r)(d.W, {
                data: {
                    uri: e.pathname
                }
            })
              , o = (0,
            p.n)(i.getAbsoluteLocation(), i)
              , x = (0,
            a.useCallback)(( () => {
                const e = i.reloadPageButtonFactory().hitRefreshContent();
                n.logInteraction(e),
                window.location.reload()
            }
            ), [i, n]);
            return (0,
            y.jsxs)("div", {
                className: m,
                ref: o,
                children: [(0,
                y.jsx)(s, {
                    width: 46,
                    height: 46
                }), (0,
                y.jsx)("h1", {
                    children: u.Ru.get("error-dialog.generic.header")
                }), (0,
                y.jsx)("p", {
                    children: u.Ru.get("error-dialog.generic.body")
                }), (0,
                y.jsx)(c.$, {
                    onClick: x,
                    children: u.Ru.get("fatal-error.button-label")
                })]
            })
        }
        ))
    }
    ,
    2645: (e, s, t) => {
        t.d(s, {
            r: () => f
        });
        t(9243),
        t(77369);
        var a = t(30758)
          , r = t(67735)
          , i = t(78717)
          , n = t(78429)
          , o = t(18831)
          , l = t(96579)
          , c = t(5338)
          , d = t(84409);
        const u = "CqCtb3wr4SK8AiZwxeH0"
          , p = "IGCDq9qa08JVVY3mcy7Y"
          , h = "Vn9yz8P5MjIvDT8c0U6w"
          , m = "MtV402NmdUF5mceSD0Dy"
          , y = "WDC2Yzs811n7JCYtYQzc";
        var g = t(86070);
        const x = r.l0o
          , f = e => {
            let {title: s, imageUrl: t, viewId: r, pageId: f, color: b=x, href: j, index: v, ubiId: C} = e;
            const R = r && `/genre/${r}` || j || "#"
              , {spec: A, logger: P} = (0,
            d.r)(n.b, {
                data: {
                    position: v,
                    identifier: C
                }
            })
              , w = (0,
            a.useCallback)(( () => {
                const e = (0,
                o.o_h)(R)?.toURI();
                e && P.logInteraction(A.hitUiNavigate({
                    destination: e
                }))
            }
            ), [P, A, R])
              , k = s.split("/")
              , I = k.map(( (e, s) => (0,
            g.jsxs)("span", {
                children: [e, (0,
                g.jsx)("wbr", {}), s < k.length - 1 ? "/" : null]
            }, s)));
            return (0,
            g.jsx)("div", {
                className: p,
                role: "listitem",
                children: (0,
                g.jsx)(l.N, {
                    to: R,
                    pageId: f,
                    className: u,
                    onClick: w,
                    children: (0,
                    g.jsxs)("div", {
                        className: h,
                        style: {
                            backgroundColor: b
                        },
                        children: [t ? (0,
                        g.jsx)(c._, {
                            loading: "lazy",
                            src: t,
                            className: y
                        }) : null, (0,
                        g.jsx)(i.E, {
                            variant: "titleSmall",
                            className: m,
                            title: s,
                            children: I
                        })]
                    })
                })
            })
        }
    }
    ,
    12286: (e, s, t) => {
        t.d(s, {
            X: () => r
        });
        var a = t(1231);
        function r(e) {
            return [a.kw.YES, a.kw.DOWNLOADING, a.kw.WAITING].includes(e)
        }
    }
    ,
    15400: (e, s, t) => {
        t.d(s, {
            $: () => a
        });
        const a = new (t(63388).l)("removeConcertFromLibrary","mutation","2b6a3dc45db6b423eb36c628ccb26768f2c03e75ae274e09a1701336d46dd21d",null)
    }
    ,
    15623: (e, s, t) => {
        t.d(s, {
            u: () => p
        });
        var a = t(97500)
          , r = t.n(a)
          , i = t(52427)
          , n = t(26852)
          , o = t(28831)
          , l = t(4116)
          , c = t(68293)
          , d = t(68137)
          , u = t(86070);
        const p = e => {
            let {uri: s, src: t, playAriaLabel: a, onClick: p, isPlaying: h, isActive: m, isLocked: y, isEpisode: g, isVideo: x, spec: f} = e;
            const b = (0,
            c.s)()
              , j = (0,
            i.YQ)((e => {
                let t;
                if (f) {
                    const e = f.playbackButtonFactory();
                    let a;
                    a = m && h ? e.hitPause({
                        itemToBePaused: s
                    }) : m && !h ? e.hitResume({
                        itemToBeResumed: s
                    }) : e.hitPlay({
                        itemToBePlayed: s
                    }),
                    t = b.logInteraction(a)
                }
                p(e, t)
            }
            ), l.d, {
                leading: !0,
                trailing: !1
            });
            return (0,
            u.jsxs)("div", {
                className: d.A.rowImageWithPlay,
                children: [(0,
                u.jsx)(o.e, {
                    src: t,
                    isEpisode: g,
                    isVideo: x
                }), (0,
                u.jsx)(n.x, {
                    className: r()(d.A.rowPlayPauseButton, d.A.rowImagePlayPauseButton),
                    iconClassName: d.A.rowPlayPauseIcon,
                    onClick: j,
                    isPlaying: h,
                    isLocked: y,
                    playAriaLabel: a
                })]
            })
        }
    }
    ,
    16262: (e, s, t) => {
        t.d(s, {
            B: () => I,
            q: () => N
        });
        var a = t(30758)
          , r = t(45322)
          , i = t(3665)
          , n = t(18831)
          , o = t(26405)
          , l = t(71716)
          , c = t(35054)
          , d = t(76020)
          , u = t(51160)
          , p = t(7792)
          , h = t(94911)
          , m = t(49294)
          , y = t(17564)
          , g = t(26562)
          , x = t(80464)
          , f = t(33334)
          , b = t(64273)
          , j = t(24886)
          , v = t(10167)
          , C = t(53507)
          , R = t(61315)
          , A = t(84409)
          , P = t(2897)
          , w = t(85370)
          , k = t(86070);
        function I(e) {
            return {
                uri: e.uri,
                name: e.name,
                trailer: e.trailer,
                showTypes: e.showTypes
            }
        }
        const S = e => `activation-trigger-mme-${e}`
          , N = a.memo((function(e) {
            let {index: s=-1, showMetadata: t, episode: N, usePlayContextItem: E} = e;
            const {isWeb: T} = (0,
            b.V)()
              , U = N.playedState.playPositionMilliseconds
              , q = N.uri
              , F = (0,
            a.useRef)(null)
              , _ = (0,
            y.N)(t.uri)
              , {draggable: M, onDragStart: B} = (0,
            g.P)()
              , L = (0,
            x.V)()
              , V = (0,
            j.y)()
              , O = (0,
            r.wA)()
              , {UBIFragment: D, spec: H, logger: W} = (0,
            A.r)(i.d, {
                data: {
                    uri: q,
                    reason: N.requestId || "",
                    position: s
                }
            })
              , $ = (0,
            R.n)(H.getAbsoluteLocation(), H)
              , {isActive: G, isPlaying: z, togglePlay: Y} = E({
                uri: q
            })
              , [Q] = (0,
            v.S)(1e4, (e => e?.item?.uri === q))
              , {isFullyPlayed: Z, setIsFullyPlayed: X} = (0,
            C.e)({
                uri: q,
                durationMs: N.duration.milliseconds,
                episodePlaybackState: N.playedState?.state,
                isPlaying: z
            });
            (0,
            a.useEffect)(( () => {
                z && (F.current = Q)
            }
            ), [z, Q]),
            (0,
            a.useEffect)(( () => {
                !z && F.current && N.duration.milliseconds <= F.current && X(!0)
            }
            ), [z, N.duration.milliseconds, X]);
            const J = (0,
            a.useCallback)((e => {
                e || (F.current = 0),
                X(e)
            }
            ), [X])
              , K = I(t)
              , ee = (0,
            f.C)({
                ...N,
                coverArt: {
                    sources: N.coverArt
                }
            }, K)
              , se = (0,
            a.useCallback)(( () => {
                if (N.episodeType === P.I_.Episode && T)
                    p.h.set(( () => ({
                        triggerId: S(N.uri),
                        triggerAction: null
                    })));
                else if (L)
                    ee();
                else {
                    let e;
                    e = z ? H.playButtonFactory().hitPause({
                        itemToBePaused: q
                    }) : G ? H.playButtonFactory().hitResume({
                        itemToBeResumed: q
                    }) : H.playButtonFactory().hitPlay({
                        itemToBePlayed: q
                    });
                    const s = W.logInteraction(e);
                    Y({
                        loggingParams: s
                    })
                }
            }
            ), [G, ee, Y, q, z, L, N, T, W, H])
              , te = (0,
            a.useCallback)(( () => {
                W.logInteraction(H.hitUiNavigate({
                    destination: q
                }))
            }
            ), [q, W, H])
              , ae = N.podcastSubscription?.isPaywalled ?? !1
              , re = N.podcastSubscription?.isUserSubscribed ?? !1
              , ie = ae && !re
              , ne = ae && L
              , {badges: oe} = (0,
            w.b)({
                contentRating: N.contentRating?.label,
                isPaywalled: ae
            })
              , le = (0,
            a.useCallback)(( () => O((0,
            o.Tf)(t.uri))), [t.uri, O])
              , ce = (0,
            a.useCallback)((e => {
                let s = e;
                return (ie || ne) && (s = (0,
                k.jsx)(h.N, {
                    enabled: !0,
                    showUri: N.podcast?.uri || t.uri,
                    renderInline: !1,
                    children: s
                })),
                !N.playability.playable && oe.nineteen && (s = (0,
                k.jsx)("div", {
                    onClick: e => {
                        e.stopPropagation(),
                        le()
                    }
                    ,
                    children: e
                })),
                s = (0,
                k.jsx)(l.k, {
                    id: S(q),
                    targetURI: (0,
                    n.o_h)(q),
                    children: s
                }),
                s
            }
            ), [q, ie, ne, t.uri, oe.nineteen, N.playability.playable, le, N.podcast?.uri]);
            return (0,
            k.jsx)(D, {
                spec: H,
                children: (0,
                k.jsx)(c.h, {
                    onShow: () => {
                        W.logInteraction(H.secondaryHitUiReveal())
                    }
                    ,
                    menu: (0,
                    k.jsx)(d.b, {
                        uri: q,
                        showUri: t.uri,
                        sharingInfo: N.sharingInfo,
                        isPlayed: Z,
                        onMarkAsPlayed: J
                    }),
                    children: (0,
                    k.jsx)(u.k, {
                        ref: $,
                        requestId: N.requestId,
                        index: s,
                        uri: q,
                        size: V,
                        images: N.coverArt || [],
                        name: N.name,
                        showName: N.podcast?.name || t.name,
                        description: N.description,
                        isPlayable: N.playability.playable || ie,
                        fullyPlayed: Z,
                        durationMs: N.duration.milliseconds,
                        releaseDate: N.releaseDate,
                        resumePositionMs: F.current ?? U,
                        draggable: M,
                        handleDragStart: e => {
                            if (e.target !== e.currentTarget)
                                return;
                            const s = `${N.name} • ${t.name}`;
                            B(e, {
                                itemUris: [q],
                                dragLabelText: s,
                                contextUri: t.uri
                            })
                        }
                        ,
                        handlePlaybackClick: se,
                        handleClick: te,
                        isCurrentlyPlaying: G,
                        isPaywalled: ae,
                        isUserSubscribed: re,
                        isCourseLesson: _,
                        isPlaying: z,
                        position: z ? Q : void 0,
                        episodeSharingInfo: N.sharingInfo,
                        onMarkAsPlayed: J,
                        contentInformation: N.contentInformation,
                        showUri: N.podcast?.uri || t.uri,
                        mediaTypes: N.mediaTypes ?? void 0,
                        badges: (0,
                        k.jsx)(m.P, {
                            episode: N
                        }),
                        playButtonWrapper: ce,
                        onMoreButtonClick: () => {
                            W.logInteraction(H.moreButtonFactory().hitUiReveal())
                        }
                        ,
                        sixteenByNineCoverImages: N.sixteenByNineCoverImages ?? void 0,
                        dynamicColors: N.dynamicColors ?? void 0
                    })
                })
            })
        }
        ))
    }
    ,
    16562: (e, s, t) => {
        t.d(s, {
            RS: () => r,
            f0: () => n,
            o8: () => i
        });
        t(9243),
        t(77369);
        var a = t(1287);
        function r(e) {
            return {
                url: e.url,
                width: e.width,
                height: e.height
            }
        }
        function i(e) {
            if ("Episode" === e.__typename) {
                const s = e.podcastV2.data;
                return "Podcast" !== s.__typename ? [] : s.coverArt?.sources.map(r) ?? []
            }
            return []
        }
        function n(e) {
            switch (e.__typename) {
            case "Artist":
                return e.visuals.avatarImage?.sources.map(r) ?? [];
            case "Album":
            case "Audiobook":
            case "Podcast":
            case "Episode":
            case "Chapter":
                return e.coverArt?.sources.map(r) ?? [];
            case "Track":
                return e.albumOfTrack?.coverArt?.sources.map(r) ?? [];
            case "Playlist":
                return e.images.items[0]?.sources.map(r) ?? [];
            case "User":
                return e.avatar?.sources.map(r) ?? [];
            case "Merch":
                return e.image?.sources.map(r) ?? [];
            case "ArtistConcerts":
                {
                    const s = e.mainArtist.data;
                    return "Artist" !== s.__typename ? [] : s.visuals.avatarImage?.sources.map(r) ?? []
                }
            case "BrowseSectionContainer":
                return e.data?.cardRepresentation?.artwork?.sources.map(r) ?? [];
            case "BrowseClientFeature":
                return e.artwork?.sources.map(r) ?? e.iconOverlay?.sources.map(r) ?? [];
            case "GenericError":
            case "NotFound":
            case "RestrictedContent":
            case "BrowseSpacesHub":
            case "BrowseExternalHref":
                return [];
            default:
                return (0,
                a.k)(e),
                []
            }
        }
    }
    ,
    27135: (e, s, t) => {
        t.d(s, {
            d: () => a
        });
        const a = new (t(63388).l)("addConcertToLibrary","mutation","c4670bb9503f201cff5a61ee426a0aa93cac0eaa1c1b9b8c66d53e058f270f7c",null)
    }
    ,
    27704: (e, s, t) => {
        t.d(s, {
            PG: () => r,
            f8: () => n,
            oC: () => a,
            s8: () => i
        });
        const a = o(120)
          , r = o(30)
          , i = o(60)
          , n = o(15);
        function o(e) {
            return 60 * e * 1e3
        }
    }
    ,
    32382: (e, s, t) => {
        t.d(s, {
            d: () => c
        });
        var a = t(97500)
          , r = t.n(a)
          , i = t(2401)
          , n = t(18298);
        const o = "UyzJidwrGk3awngSGIwv";
        var l = t(86070);
        const c = e => {
            let {durationMs: s, className: t, displaySeconds: a} = e;
            const {hours: c, minutes: d, seconds: u} = (0,
            i.S)(s);
            return a = !1 !== a && !c && u,
            (0,
            l.jsx)("span", {
                className: r()(o, t),
                children: (0,
                n.j)({
                    h: c,
                    m: d,
                    s: a ? u : 0
                })
            })
        }
    }
    ,
    37992: (e, s, t) => {
        t.d(s, {
            R: () => i
        });
        var a = t(96579)
          , r = t(86070);
        const i = e => {
            let {uri: s, enabled: t, className: i, children: n, onClick: o} = e;
            return t ? (0,
            r.jsx)(a.N, {
                to: s,
                className: i,
                onClick: o,
                children: n
            }) : (0,
            r.jsx)(r.Fragment, {
                children: n
            })
        }
    }
    ,
    42812: (e, s, t) => {
        t.d(s, {
            K: () => r
        });
        var a = t(18831);
        function r(e) {
            const s = (0,
            a.o_h)(e, {
                parseUnknown: !0
            })
              , [t,r] = s?.args ?? [];
            if (r && "page" === t)
                return `/genre/${r}`
        }
    }
    ,
    49294: (e, s, t) => {
        t.d(s, {
            P: () => p
        });
        var a = t(8616)
          , r = t(46427)
          , i = t(74459)
          , n = t(99893)
          , o = t(52567)
          , l = t(94156)
          , c = t(13695)
          , d = t(85370)
          , u = t(86070);
        const p = e => {
            let {episode: s, showVideoBadge: t=!1} = e;
            const {badges: p} = (0,
            d.b)((e => "contentRating"in e)(s) ? {
                contentRating: s?.contentRating?.label,
                isPaywalled: s.podcastSubscription?.isPaywalled,
                isVideo: s.mediaTypes?.includes(c.C.Video)
            } : {
                isExplicit: s?.isExplicit,
                isMOGEFRestricted: s?.is19PlusOnly,
                isPaywalled: s.podcastSubscription?.isPaywalled
            })
              , h = s.gatedEntityRelations && s.gatedEntityRelations.entitiesWithValueProps.at(0)
              , m = (0,
            i.B)(h, s);
            return (0,
            u.jsxs)(u.Fragment, {
                children: [p.explicit && (0,
                u.jsx)(n.U, {}), m ? (0,
                u.jsx)(r.x, {
                    gatedEntityRelations: s.gatedEntityRelations
                }) : p.paid && (0,
                u.jsx)(o.y, {}), p.nineteen && (0,
                u.jsx)(l.q, {
                    size: 16
                }), t && p.isVideo && (0,
                u.jsx)(a.T, {})]
            })
        }
    }
    ,
    53507: (e, s, t) => {
        t.d(s, {
            e: () => o
        });
        var a = t(30758)
          , r = t(85834)
          , i = t(99875)
          , n = t(10167);
        const o = e => {
            let {uri: s, durationMs: t, episodePlaybackState: o, isPlaying: l} = e;
            const c = (0,
            r.p)(s)
              , [d,u] = (0,
            a.useState)(o === i._w.Completed || c?.state === i.H7.Completed)
              , [p] = (0,
            n.S)(1e4, (e => e?.item?.uri === s));
            return (0,
            a.useEffect)(( () => {
                !l && (o === i._w.Completed || c?.state === i.H7.Completed || p > t - 1e4) && u(!0)
            }
            ), [t, o, l, p, c?.state]),
            {
                isFullyPlayed: d,
                setIsFullyPlayed: u
            }
        }
    }
    ,
    53888: (e, s, t) => {
        t.d(s, {
            a: () => a
        });
        const a = e => e?.linked_from?.uri || e.uri
    }
    ,
    63360: (e, s, t) => {
        t.d(s, {
            j: () => w
        });
        var a = t(55797)
          , r = t(70397);
        const i = "wIA_5Ypq0rltNPeZQpM4"
          , n = "Swi6YtNEFCCVz8l4y75v"
          , o = "pklLPOhfigdytL9bPoth"
          , l = "sb24Y8kdMZInJ8aI8dXT";
        var c = t(18298)
          , d = t(2401)
          , u = t(86070);
        function p(e) {
            let {ariaValueText: s, max: t, current: a} = e;
            const p = {
                transform: `translateX(-${100 - (t && a ? 100 * Math.min(1, a / t) : 0)}%)`
            }
              , h = Math.ceil(Math.max(t - a, 0))
              , {hours: m, minutes: y, seconds: g} = (0,
            d.S)(t)
              , x = (0,
            c.j)({
                h: m,
                m: y,
                s: g
            })
              , {hours: f, minutes: b, seconds: j} = (0,
            d.S)(h)
              , v = (0,
            c.j)({
                h: f,
                m: b,
                s: j
            })
              , C = s || r.Ru.get("time.left-of", v, x);
            return (0,
            u.jsxs)("div", {
                className: i,
                role: "progressbar",
                tabIndex: 0,
                "aria-valuenow": a,
                "aria-valuemin": 0,
                "aria-valuemax": t,
                "aria-valuetext": C,
                children: [(0,
                u.jsx)("div", {
                    className: n
                }), (0,
                u.jsx)("div", {
                    className: o,
                    children: (0,
                    u.jsx)("div", {
                        "data-testid": "progressBarFg",
                        className: l,
                        style: p
                    })
                })]
            })
        }
        const h = "qfYkuLpETFW3axnfMntO"
          , m = "_q93agegdE655O5zPz6l"
          , y = "z7Yl7CIT1AB0y91f_moh"
          , g = "iLIlkUcfIq56KncGtX7u"
          , x = "nV50yZ6BR_TIuWP3l7b1"
          , f = "qLjIx_SzBEpDRA_q7kxQ";
        var b = t(78717)
          , j = t(60940)
          , v = t(97500)
          , C = t.n(v)
          , R = t(32382);
        const A = "xWm_uA0Co4SXVxaO7wlB"
          , P = e => {
            let {durationMs: s, className: t, displaySeconds: a} = e;
            const {hours: i, minutes: n, seconds: o} = (0,
            d.S)(s);
            a = !1 !== a && !i && o;
            const l = (0,
            c.j)({
                h: i,
                m: n,
                s: a ? o : 0
            });
            return l ? (0,
            u.jsx)("span", {
                className: C()(A, t),
                children: r.Ru.get("time.left", l)
            }) : null
        }
          , w = e => {
            const {resumePositionMs: s=0, releaseDate: t, isPlaying: i, fullyPlayed: n, durationMs: o, position: l=s, compactVariant: c=!1, className: d, progressBarClassName: v, progressStateClassName: A, releaseDateClassName: w} = e
              , k = t && t.isoString ? (0,
            u.jsx)(b.E, {
                as: "p",
                variant: "bodySmall",
                className: m,
                children: (0,
                a.V2)((0,
                a.ad)(t.isoString), t.precision)
            }) : null
              , I = ( () => {
                if (0 === o)
                    return null;
                if (n && !i)
                    return (0,
                    u.jsxs)("div", {
                        className: C()(g, A),
                        children: [(0,
                        u.jsx)(b.E, {
                            as: "p",
                            variant: "bodySmall",
                            className: y,
                            children: r.Ru.get("episode.audiobook.chapter.finished")
                        }), (0,
                        u.jsx)(j.i, {
                            size: "small",
                            className: f,
                            "aria-hidden": "true"
                        })]
                    });
                if (l > 0 || i) {
                    const e = Math.ceil(Math.max(o - l, 0));
                    return (0,
                    u.jsx)("div", {
                        className: C()(g, A),
                        children: (0,
                        u.jsx)(b.E, {
                            as: "p",
                            variant: "bodySmall",
                            className: y,
                            children: (0,
                            u.jsx)(P, {
                                durationMs: e,
                                displaySeconds: !c && void 0
                            })
                        })
                    })
                }
                return (0,
                u.jsx)(b.E, {
                    as: "p",
                    variant: "bodySmall",
                    className: C()(m, w),
                    "data-testid": "episode-progress-not-played",
                    children: (0,
                    u.jsx)(R.d, {
                        durationMs: o,
                        displaySeconds: !c && void 0
                    })
                })
            }
            )()
              , S = 0 === o ? null : !n && l > 0 || i ? (0,
            u.jsx)("div", {
                className: C()(x, v),
                children: (0,
                u.jsx)(p, {
                    current: l,
                    max: o
                })
            }) : null;
            return k || I || S ? (0,
            u.jsxs)("div", {
                className: C()(h, d),
                children: [k, I, S]
            }) : null
        }
    }
    ,
    79505: (e, s, t) => {
        t.r(s),
        t.d(s, {
            default: () => Ta
        });
        t(9243),
        t(66016);
        var a = t(30758)
          , r = t(51822)
          , i = t(85387)
          , n = t(3074)
          , o = t.n(n)
          , l = t(65809)
          , c = t(81396)
          , d = t(11120)
          , u = t(70397)
          , p = t(19399)
          , h = t(51995)
          , m = t(86070);
        const y = {
            albums: d.$h.SEARCH_ALBUMS,
            artists: d.$h.SEARCH_ARTISTS,
            episodes: d.$h.SEARCH_EPISODES,
            genres: d.$h.SEARCH_GENRES,
            playlists: d.$h.SEARCH_PLAYLISTS,
            podcasts: d.$h.SEARCH_SHOWS,
            audiobooks: d.$h.SEARCH_AUDIOBOOKS,
            tracks: d.$h.SEARCH_SONGS,
            users: d.$h.SEARCH_PROFILES,
            podcastAndEpisodes: d.$h.SEARCH_PODCASTS_AND_EPISODES,
            topResults: d.$h.SEARCH
        };
        function g(e) {
            let {children: s} = e;
            const {query: t="", category: a=""} = (0,
            i.g)();
            return (0,
            m.jsx)(h.e, {
                pageId: y[a],
                entityUri: `spotify:app:search:${t}:${a}`,
                children: s
            })
        }
        function x(e) {
            let {children: s} = e;
            const {query: t} = (0,
            i.g)();
            return (0,
            m.jsx)(h.e, {
                pageId: d.$h.SEARCH,
                entityUri: `spotify:app:search:${t}`,
                children: s
            })
        }
        var f = t(9477)
          , b = (t(77369),
        t(82092))
          , j = t(2645)
          , v = t(16562)
          , C = t(42812)
          , R = t(1287);
        function A(e) {
            const s = (0,
            v.f0)(e);
            if (s[0])
                return s[0].url
        }
        function P(e, s) {
            switch (e.content.__typename) {
            case "BrowseXlinkResponseWrapper":
            case "BrowseSectionContainerWrapper":
                return function(e, s, t) {
                    switch (e.__typename) {
                    case "BrowseClientFeature":
                        return (0,
                        m.jsx)(j.r, {
                            title: e.title?.transformedLabel ?? "",
                            pageId: "search",
                            href: e.featureUri,
                            color: e.backgroundColor?.hex,
                            imageUrl: A(e),
                            ubiId: e.featureUri,
                            index: s
                        }, e.featureUri);
                    case "BrowseSectionContainer":
                        return e.data?.cardRepresentation ? (0,
                        m.jsx)(j.r, {
                            title: e.data.cardRepresentation.title?.transformedLabel ?? "",
                            pageId: "search",
                            href: (0,
                            C.K)(t),
                            color: e.data.cardRepresentation.backgroundColor?.hex,
                            imageUrl: A(e),
                            ubiId: t,
                            index: s
                        }, t) : null;
                    case "BrowseSpacesHub":
                    case "GenericError":
                    case "NotFound":
                    case "BrowseExternalHref":
                        return null;
                    default:
                        return (0,
                        R.k)(e),
                        null
                    }
                }(e.content.data, s, e.uri);
            case "AlbumResponseWrapper":
            case "ArtistResponseWrapper":
            case "EpisodeOrChapterResponseWrapper":
            case "PlaylistResponseWrapper":
            case "PodcastOrAudiobookResponseWrapper":
            case "TrackResponseWrapper":
            case "UserResponseWrapper":
            case "ConcertResponseWrapper":
            case "MerchResponseWrapper":
            case "ArtistConcertsResponseWrapper":
            case "NoContent":
            case "UnknownType":
                return null;
            default:
                return (0,
                R.k)(e.content),
                null
            }
        }
        var w = t(27704)
          , k = t(63388)
          , I = t(39463);
        const S = new k.l("browseAll","query","cd6fcd0ce9d1849477645646601a6d444597013355467e24066dad2c1dc9b740",null)
          , N = () => {
            const {data: e} = ( (e, s) => (0,
            I.I)(S, e, s))({
                pagePagination: {
                    offset: 0,
                    limit: 10
                },
                sectionPagination: {
                    offset: 0,
                    limit: 99
                }
            }, {
                gcTime: w.oC,
                staleTime: w.PG
            });
            return "BrowseSectionContainer" !== e?.browseStart?.__typename ? [] : e.browseStart.sections?.items ?? []
        }
        ;
        var E = t(66893)
          , T = t(18199)
          , U = t(23291);
        const q = "AGAj7hr0pC57oadgb75h"
          , F = e => {
            let {browseAllSpec: s} = e;
            const t = N();
            return (0,
            m.jsx)("div", {
                className: q,
                children: t.map(( (e, t) => function(e, s, t) {
                    if (!e.data?.__typename)
                        return null;
                    switch (e.data.__typename) {
                    case "BrowseGridSectionData":
                        return (0,
                        m.jsx)(U.r, {
                            spec: s,
                            children: (0,
                            m.jsx)(E.x, {
                                config: (0,
                                T.s1)(T.yV.BROWSE),
                                children: (0,
                                m.jsx)(b.p, {
                                    title: e.data?.title?.transformedLabel ?? "",
                                    index: t,
                                    id: e.uri,
                                    showAll: !0,
                                    role: "list",
                                    children: e.sectionItems.items.map(( (e, s) => P(e, s)))
                                })
                            })
                        }, e.uri);
                    case "BrowseSingleItemSectionData":
                    case "BrowseGenericSectionData":
                    case "BrowseRelatedSectionData":
                    case "BrowseUnsupportedSectionData":
                        return null;
                    default:
                        return (0,
                        R.k)(e.data),
                        null
                    }
                }(e, s, t)))
            })
        }
        ;
        var _ = t(84409);
        const M = "_YN9HVrnrcvnaCjYnNkM"
          , B = () => {
            const {spec: e} = (0,
            _.r)(f.A, {
                data: {
                    uri: "search:find"
                }
            })
              , s = (0,
            a.useMemo)(( () => e.browseAllFactory()), [e]);
            return (0,
            m.jsx)("div", {
                className: M,
                children: (0,
                m.jsx)(F, {
                    browseAllSpec: s
                })
            })
        }
        ;
        var L = t(2030)
          , V = t(93955)
          , O = t(18831)
          , D = t(55492)
          , H = t(86814)
          , W = t(60749)
          , $ = t(78717)
          , G = t(73136)
          , z = t(81563);
        const Y = (0,
        a.createContext)(null)
          , Q = Y.Provider;
        function Z() {
            const e = (0,
            a.useContext)(Y);
            if (null === e)
                throw new Error("Trying to use 'SearchContext' without 'SearchProvider'!");
            return e
        }
        var X = t(45786)
          , J = t(9735)
          , K = t(61315);
        const ee = "_5hJUuCVGXtd6CaXQBUM"
          , se = "DH8aRN7lGO_ZqFegRTmj"
          , te = "W37c8X5LCtHtmryEzR4I"
          , ae = "oNTqWDEksr002PdYJVmT"
          , re = e => {
            let {forChip: s} = e;
            const {query: t, serpId: a} = Z()
              , r = !(0,
            X.n)()
              , i = `/search/${t}`
              , n = (0,
            O.RuZ)(t).toURI()
              , {spec: o, logger: l} = (0,
            J.D)(z.w, {
                data: {
                    uri: n,
                    reason: a
                }
            })
              , c = (0,
            K.n)(o.getAbsoluteLocation(), o);
            return (0,
            m.jsxs)("div", {
                className: ee,
                "aria-live": "polite",
                ref: c,
                children: [(0,
                m.jsx)($.E, {
                    as: "h1",
                    variant: "titleSmall",
                    className: se,
                    children: s ? u.Ru.get("search.empty-results-title-for-chip", t, s) : u.Ru.get("search.empty-results-title", t)
                }), (0,
                m.jsx)("p", {
                    className: te,
                    children: r ? u.Ru.get("web-player.search-modal.offline") : u.Ru.get("search.empty-results-text")
                }), s && (0,
                m.jsx)(W.N_, {
                    to: i,
                    children: (0,
                    m.jsx)(G.$, {
                        colorSet: "invertedLight",
                        className: ae,
                        onClick: () => {
                            l.logInteraction(o.seeAllButtonFactory().hitUiNavigate({
                                destination: i
                            }))
                        }
                        ,
                        children: u.Ru.get("search.see-all")
                    })
                })]
            })
        }
        ;
        var ie = t(85982);
        const ne = {
            results: null,
            isError: !1,
            isFetchMoreError: !1
        };
        var oe = t(16262)
          , le = t(33269)
          , ce = t(332)
          , de = t(24886)
          , ue = t(53467)
          , pe = t(72432)
          , he = t(68293);
        const me = "l5wWcdJAOxbcnqyfuEmX"
          , ye = "niq6jXm6QbYCNJJ6J0wQ"
          , ge = "L3pQN7b5ky5wG5LuGE6o"
          , xe = e => {
            let {index: s, item: t} = e;
            const {episode: a, show: r} = t
              , {usePlayContextItem: i} = (0,
            pe.P)({
                uri: t.episode.uri
            }, {
                featureIdentifier: "search",
                referrerIdentifier: "search"
            });
            return (0,
            m.jsxs)("div", {
                className: ge,
                children: [(0,
                m.jsx)(oe.q, {
                    index: s,
                    episode: {
                        ...a,
                        requestId: t.requestId
                    },
                    showMetadata: r,
                    usePlayContextItem: i
                }), (0,
                m.jsx)("hr", {
                    className: ye,
                    "aria-hidden": !0
                })]
            })
        }
          , fe = e => {
            let {showTitle: s=!0, displayEmptyPageOnEmptyResults: t=!0, displayError: a=!0, enableInfiniteScroll: r=!1, fetchData: i, totalCountRef: n, items: o, isError: l} = e;
            const {query: c, serpId: d} = Z()
              , u = (0,
            O.RuZ)(c).toURI()
              , {ref: p, breakpoint: h} = (0,
            ue.x)({
                [ce.E.MEDIUM]: 0,
                [ce.E.LARGE]: 600
            })
              , y = (0,
            he.s)()
              , g = `spotify:app:search:${encodeURIComponent(c)}:episodes`
              , {spec: x, UBIFragment: f} = (0,
            _.r)(V.w, {
                data: {
                    uri: u,
                    reason: d
                }
            });
            return l ? a ? (0,
            m.jsx)(L.PageErrorTemplate, {}) : null : 0 === n.current ? t ? (0,
            m.jsx)(f, {
                spec: x.emptyResultsFactory(),
                children: (0,
                m.jsx)(re, {
                    forChip: H.j7.episodes()
                })
            }) : null : (0,
            m.jsxs)(de.o.Provider, {
                value: h,
                children: [o && s && (0,
                m.jsx)(D.k, {
                    title: H.j7.episodes(),
                    seeAllUri: g,
                    onClickTitle: () => {
                        x && y.logInteraction(x.episodesListFactory().episodesListHeaderFactory().titleFactory().hitUiNavigate({
                            destination: g
                        }))
                    }
                    ,
                    onClickSeeAll: () => {
                        x && y.logInteraction(x.episodesListFactory().episodesListHeaderFactory().seeAllLinkFactory().hitUiNavigate({
                            destination: g
                        }))
                    }
                    ,
                    showSeeAll: !r && o.length < (n.current || 0)
                }), (0,
                m.jsx)("div", {
                    ref: p,
                    className: me,
                    children: o && (0,
                    m.jsx)(le._, {
                        triggerOnInitialLoad: !1,
                        onReachBottom: () => {
                            r && i()
                        }
                        ,
                        children: o
                    })
                })]
            })
        }
          , be = e => {
            const {query: s, api: t} = Z()
              , {results: r, isError: i, fetchData: n, totalCountRef: o} = ( (e, s) => {
                const t = (0,
                ie.a)()
                  , r = (0,
                a.useRef)(null)
                  , i = (0,
                a.useRef)(0)
                  , [n,o] = (0,
                a.useState)(ne)
                  , l = (0,
                a.useCallback)((async function() {
                    let a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (!t())
                        return;
                    a && (i.current = 0,
                    r.current = null);
                    let n = e;
                    if (null !== r.current) {
                        if (i.current >= r.current)
                            return;
                        i.current + n > r.current && (n = r.current - i.current)
                    }
                    try {
                        const e = await s(i.current, n);
                        i.current += n,
                        r.current = e.totalCount || 0,
                        t() && o((s => ({
                            isError: !1,
                            isFetchMoreError: !1,
                            results: (a || null === s.results ? [] : s.results).concat(e.items)
                        })))
                    } catch (l) {
                        t() && o((e => {
                            const s = null === e.results || a;
                            return {
                                results: a ? [] : e.results,
                                isError: s,
                                isFetchMoreError: !s
                            }
                        }
                        ))
                    }
                }
                ), [e, s, t]);
                return (0,
                a.useEffect)(( () => {
                    l(!0)
                }
                ), [l]),
                {
                    results: n.results,
                    isError: n.isError,
                    fetchData: l,
                    totalCountRef: r
                }
            }
            )(30, (0,
            a.useCallback)(( (e, a) => t.getFullEpisodes(s, e, a)), [t, s]));
            return (0,
            m.jsx)(fe, {
                ...e,
                fetchData: n,
                totalCountRef: o,
                items: r?.map(( (e, s) => (0,
                m.jsx)(xe, {
                    item: e,
                    index: s
                }, s))),
                isError: i
            })
        }
        ;
        var je = t(53923);
        const ve = e => {
            const {title: s, category: t, query: a, results: r, onAddToHistory: i, position: n, showSeeAll: o} = e;
            if (!r)
                return null;
            const {items: l, totalCount: c} = r;
            return l && 0 !== l.length ? (0,
            m.jsx)(b.p, {
                index: n,
                id: t,
                total: c || 0,
                title: s,
                testId: `${t}-search-entity`,
                seeAllUri: `spotify:app:search:${encodeURIComponent(a)}:${t}`,
                showSeeAll: o,
                children: l.map(( (e, s) => (0,
                m.jsx)(je.Q, {
                    onClick: () => i(e),
                    onPlay: () => {
                        i(e)
                    }
                    ,
                    entity: e,
                    index: s
                }, e.uri)))
            }) : null
        }
          , Ce = "T2yEew5FpZAOv3uHa0NK"
          , Re = e => {
            let {results: s} = e;
            const {query: t, serpId: a, onAddToHistory: r} = Z()
              , i = (0,
            O.RuZ)(t).toURI()
              , {spec: n, UBIFragment: o} = (0,
            _.r)(V.w, {
                data: {
                    uri: i,
                    reason: a
                }
            });
            return 0 === s?.podcasts.totalCount && 0 === s?.episodes.totalCount ? (0,
            m.jsx)(o, {
                spec: n.emptyResultsFactory(),
                children: (0,
                m.jsx)(re, {
                    forChip: H.j7.podcastAndEpisodes()
                })
            }) : (0,
            m.jsx)(o, {
                spec: n,
                children: (0,
                m.jsxs)("div", {
                    className: Ce,
                    children: [0 !== s?.podcasts.totalCount && (0,
                    m.jsx)("div", {
                        children: (0,
                        m.jsx)(ve, {
                            position: 0,
                            category: "podcasts",
                            title: H.j7.podcastAndEpisodes(),
                            query: t,
                            results: s?.podcasts,
                            onAddToHistory: r
                        })
                    }), 0 !== s?.episodes.totalCount && (0,
                    m.jsx)("div", {
                        children: (0,
                        m.jsx)(be, {
                            displayEmptyPageOnEmptyResults: !1,
                            displayError: !1
                        })
                    })]
                })
            })
        }
        ;
        var Ae = t(97500)
          , Pe = t.n(Ae)
          , we = t(4890)
          , ke = (t(54687),
        t(15069))
          , Ie = t(59161);
        const Se = e => {
            let {query: s, category: t, pageSize: i, includePreReleases: n} = e;
            const {api: o} = Z()
              , c = (0,
            r.jE)()
              , d = (0,
            l.NC)(Ie.Wvg)
              , u = (0,
            a.useMemo)(( () => ["searchCategoryResults", s, {
                category: t,
                pageSize: i,
                includePreReleases: n
            }]), [t, n, i, s])
              , {data: p, isError: h, isLoading: m, fetchNextPage: y} = (0,
            ke.q)({
                queryKey: u,
                initialPageParam: {
                    offset: 0,
                    limit: i
                },
                queryFn: async e => {
                    let {pageParam: a, signal: r} = e;
                    return await o.getSearchCategoryResults(t, {
                        searchTerm: s,
                        offset: a.offset,
                        limit: a.limit,
                        includeAudiobooks: !0,
                        includePreReleases: n,
                        includeAuthors: d
                    }, r)
                }
                ,
                getNextPageParam: (e, s) => {
                    if (!e)
                        return null;
                    const t = e.pagingInfo?.nextOffset;
                    if (null === t)
                        return null;
                    let a = i;
                    return void 0 !== e.totalCount && t + a >= e.totalCount && (a = e.totalCount - t),
                    {
                        offset: t,
                        limit: a
                    }
                }
                ,
                select: e => e.pages.flatMap((e => e.items)),
                gcTime: 6e5,
                staleTime: 3e5
            });
            return (0,
            a.useEffect)(( () => () => {
                c.setQueryData(u, (e => ({
                    pages: e?.pages.slice(0, 2) ?? [],
                    pageParams: e?.pageParams.slice(0, 2) ?? []
                })))
            }
            ), [c, u]),
            {
                results: p,
                isLoading: m,
                isError: h,
                fetchNextPage: y
            }
        }
        ;
        var Ne = t(48883);
        const Ee = "w7SWsAZah4vovAuFxjgk"
          , Te = "Qmu4FPZCnrDpQ85s4az5"
          , Ue = "Ih5mmxAJFDIBYVcQQrrN"
          , qe = e => {
            let {displayChips: s, category: t} = e;
            const {query: r, serpId: i, onAddToHistory: n} = Z()
              , o = "audiobooks" === t
              , {results: l, isError: c, isLoading: d, fetchNextPage: u} = Se({
                query: r,
                category: t,
                pageSize: 30,
                includePreReleases: o
            })
              , p = (0,
            a.useCallback)(( (e, s) => (0,
            m.jsx)("div", {
                className: Ue,
                children: (0,
                m.jsx)(je.Q, {
                    entity: e,
                    onClick: () => {
                        n(e)
                    }
                    ,
                    testId: `search-category-card-${s}`,
                    index: s
                })
            })), [n])
              , h = (0,
            O.RuZ)(r).toURI()
              , {spec: y, UBIFragment: g} = (0,
            _.r)(we.b, {
                data: {
                    uri: h,
                    identifier: t,
                    reason: i
                }
            })
              , x = (0,
            a.useMemo)(( () => y.cardsFactory()), [y])
              , f = (0,
            a.useMemo)(( () => y.emptyResultsFactory()), [y]);
            return c ? (0,
            m.jsx)(L.PageErrorTemplate, {}) : d || l && 0 !== l.length ? (0,
            m.jsx)(g, {
                spec: x,
                children: (0,
                m.jsx)("div", {
                    className: Pe()(Ee, {
                        [Te]: s
                    }),
                    children: l && (0,
                    m.jsx)(le._, {
                        onReachBottom: u,
                        triggerOnInitialLoad: !1,
                        children: (0,
                        m.jsx)(Ne.E, {
                            render: () => l.map(( (e, s) => p(e, s)))
                        })
                    })
                })
            }) : (0,
            m.jsx)(g, {
                spec: f,
                children: (0,
                m.jsx)(re, {
                    forChip: H.j7[t]()
                })
            })
        }
        ;
        var Fe = t(26464)
          , _e = t(22730)
          , Me = t(35054)
          , Be = t(1274)
          , Le = t(37992)
          , Ve = t(29611)
          , Oe = t(68229)
          , De = t(76999)
          , He = t(60331)
          , We = t(28831)
          , $e = t(80797)
          , Ge = t(20755)
          , ze = t(42511)
          , Ye = t(16379)
          , Qe = t(58955)
          , Ze = t(43327)
          , Xe = t(2835)
          , Je = t(27403)
          , Ke = t(97935)
          , es = t(28521)
          , ss = t(569)
          , ts = t(42200)
          , as = t(8616)
          , rs = t(43159)
          , is = t(8312)
          , ns = t(25208)
          , os = t(88705)
          , ls = t(64273)
          , cs = t(99893)
          , ds = t(84049)
          , us = t(94156)
          , ps = t(10070)
          , hs = t(2897)
          , ms = t(19151)
          , ys = t(85370)
          , gs = t(68137);
        const xs = a.memo((function(e) {
            let {uri: s, name: t, duration: r, artists: i, album: n, isExplicit: o, is19PlusOnly: l, isPlayable: c, index: d, imgUrl: p, requestId: h, isLyricsMatch: y, hasAssociatedVideo: g, hasAssociatedAudio: x, mediaType: f, type: b} = e;
            const {isActive: j, isPlaying: v, triggerPlay: C, togglePlay: R} = (0,
            pe.P)({
                uri: s
            }, {
                featureIdentifier: "search",
                referrerIdentifier: "search"
            })
              , {spec: A} = (0,
            J.D)(_e.i, {
                data: {
                    position: d,
                    reason: h ?? "",
                    uri: s
                }
            })
              , P = (0,
            ps.T)(s)
              , {isPlayable: w, isAnyArtistBanned: k} = (0,
            os.g)(s, {
                isPlayable: c,
                isLocal: !1,
                isOutOfMarket: !1,
                artistUris: i?.map((e => e.uri))
            })
              , {unBanArtists: I} = (0,
            is.M)(i.map((e => e.uri)))
              , S = !g && !x && b === ms.c.TRACK && f === hs.IX.Video
              , {badges: N, hasBadges: E} = (0,
            ys.b)({
                downloadAvailability: P,
                isExplicit: o,
                isMOGEFRestricted: l,
                isVideo: g || S
            })
              , T = (0,
            ss.o)(o, S)
              , U = a.useMemo(( () => S ? {
                modes: {
                    media: "audio"
                }
            } : void 0), [S])
              , q = i?.map((e => e.name)).join(u.Ru.getSeparator()) || ""
              , {isWeb: F} = (0,
            ls.V)();
            return (0,
            m.jsx)(Me.h, {
                menu: (0,
                m.jsx)(Be.P, {
                    uri: s,
                    albumUri: n?.uri,
                    artists: i,
                    contextUri: s
                }),
                children: (0,
                m.jsxs)(ts.w, {
                    uri: s,
                    contextUri: s,
                    onTriggerPlay: (e, s) => {
                        C({
                            loggingParams: s,
                            ...U
                        })
                    }
                    ,
                    isActive: j,
                    index: d,
                    ariaRowIndex: d + 1,
                    isPlayable: w,
                    isAnyArtistBanned: k,
                    handleArtistBanUndoClick: I,
                    ageRestricted: l,
                    dragMetadata: {
                        name: t,
                        createdBy: q
                    },
                    spec: A,
                    isExplicit: o,
                    children: [(0,
                    m.jsx)(Ze.y, {
                        ariaColIndex: 0,
                        children: (0,
                        m.jsx)(Ge.$, {
                            uri: s,
                            playAriaLabel: u.Ru.get("tracklist.a11y.play", t, q),
                            onClick: (e, s) => {
                                w && R({
                                    loggingParams: s,
                                    ...U
                                })
                            }
                            ,
                            isPlaying: v,
                            isActive: j,
                            spec: A,
                            children: (0,
                            m.jsx)(Ye.a, {
                                children: d + 1
                            })
                        })
                    }), (0,
                    m.jsxs)(Xe.U, {
                        ariaColIndex: 1,
                        children: [(0,
                        m.jsx)(We.e, {
                            src: T ? void 0 : p
                        }), (0,
                        m.jsxs)($e.l, {
                            children: [(0,
                            m.jsx)(Le.R, {
                                enabled: F,
                                uri: s,
                                className: gs.A.rowTitle,
                                children: (0,
                                m.jsx)(es.p, {
                                    titleText: t,
                                    children: t
                                })
                            }), E && (0,
                            m.jsxs)(De.P, {
                                children: [N.download && (0,
                                m.jsx)(ds._, {}), N.explicit && (0,
                                m.jsx)(cs.U, {}), N.nineteen && (0,
                                m.jsx)(us.q, {
                                    className: gs.A.nineteen,
                                    size: 16
                                }), N.isVideo && (0,
                                m.jsx)(as.l, {})]
                            }), (0,
                            m.jsxs)(Ke.p, {
                                children: [(0,
                                m.jsx)(Oe.l, {
                                    artists: i,
                                    spec: A
                                }), y && (0,
                                m.jsx)(ns.G, {})]
                            })]
                        })]
                    }), (0,
                    m.jsx)(Je.o, {
                        ariaColIndex: 2,
                        children: (0,
                        m.jsx)(Ve.g, {
                            uri: n?.uri || "",
                            name: n?.name || "",
                            creatorUri: i?.[0]?.uri,
                            spec: A,
                            children: n?.name
                        })
                    }), (0,
                    m.jsxs)(Qe.l, {
                        ariaColIndex: 3,
                        children: [(0,
                        m.jsx)(rs.d, {
                            uri: s,
                            spec: A
                        }), (0,
                        m.jsx)(He.P, {
                            duration: r.milliseconds
                        }), (0,
                        m.jsx)(ze.Y, {
                            menu: (0,
                            m.jsx)(Be.P, {
                                uri: s,
                                albumUri: n?.uri,
                                artists: i,
                                contextUri: s
                            }),
                            label: u.Ru.get("more.label.track", t, q),
                            spec: A
                        })]
                    })]
                })
            })
        }
        ), ( (e, s) => e.uri === s.uri));
        var fs = t(13026)
          , bs = t(77486)
          , js = t(82066)
          , vs = t(70593)
          , Cs = t(56370)
          , Rs = t(26427)
          , As = t(96579);
        const Ps = "qG4q41T8PJl0SkVgUeJc"
          , ws = "IDNDdMa6ACThrEsGWsXX"
          , ks = "CMQe02XyiUmr3OtwlzmV"
          , Is = "UnwG2v9ISmcUhnjKj22Y"
          , Ss = e => {
            let {to: s, title: t, selected: a, onClick: r} = e;
            return (0,
            m.jsx)(As.N, {
                replace: !0,
                to: s,
                tabIndex: -1,
                onClick: r,
                className: Is,
                children: (0,
                m.jsx)(js.v, {
                    selected: a,
                    selectedColorSet: "invertedLight",
                    tabIndex: -1,
                    children: t
                })
            })
        }
          , Ns = e => {
            let {searchCategories: s, selectedCategory: t, displayChips: a} = e;
            const {query: r} = Z()
              , {spec: i, logger: n} = (0,
            _.r)(vs.q, {});
            if (!r || !a)
                return null;
            const o = encodeURIComponent(r);
            return (0,
            m.jsx)("div", {
                className: Ps,
                children: (0,
                m.jsx)("div", {
                    className: Pe()(ws, "contentSpacing"),
                    children: (0,
                    m.jsxs)(Cs.FN, {
                        dragToScrollOptions: {
                            isDisabled: !1
                        },
                        scrollContentClassName: ks,
                        children: [s.length > 0 && (0,
                        m.jsx)(Rs.A, {
                            children: (0,
                            m.jsx)(Ss, {
                                to: `spotify:app:search:${o}`,
                                title: u.Ru.get("search.title.all"),
                                selected: void 0 === t,
                                onClick: () => {
                                    n.logInteraction(i.chipFactory({
                                        identifier: "all",
                                        position: 0
                                    }).hitUiNavigate({
                                        destination: `spotify:app:search:${o}`
                                    }))
                                }
                            })
                        }, "all"), s.map(( (e, s) => {
                            const a = H.j7[e]?.() ?? "";
                            return (0,
                            m.jsx)(Rs.A, {
                                children: (0,
                                m.jsx)(Ss, {
                                    to: `spotify:app:search:${o}:${e}`,
                                    title: a,
                                    selected: t === e,
                                    onClick: () => {
                                        n.logInteraction(i.chipFactory({
                                            identifier: e,
                                            position: s + 1
                                        }).hitUiNavigate({
                                            destination: `spotify:app:search:${o}:${e}`
                                        }))
                                    }
                                })
                            }, e)
                        }
                        ))]
                    })
                })
            })
        }
        ;
        var Es = t(53888)
          , Ts = t(60804);
        const Us = "oahixVvmYv3VD8UxHkpr"
          , qs = 100
          , Fs = e => {
            let {pageSize: s=qs} = e;
            if (s > 100)
                throw new Error(`PathFinder does not support page sizes > ${qs}`);
            const {query: t, serpId: r} = Z()
              , {results: i, isError: n, isLoading: o, fetchNextPage: l} = Se({
                query: t,
                category: "tracks",
                pageSize: 20,
                includePreReleases: !1
            })
              , c = (0,
            a.useCallback)(( (e, s) => {
                const t = (0,
                Ts.g)(e.album?.images, {
                    desiredSize: 40
                });
                return (0,
                m.jsx)(xs, {
                    index: s,
                    uri: (0,
                    Es.a)(e),
                    duration: e.duration,
                    name: e.name,
                    album: e.album || void 0,
                    artists: e.artists,
                    isPlayable: e.isPlayable,
                    isExplicit: e.isExplicit,
                    is19PlusOnly: e.is19PlusOnly,
                    imgUrl: t?.url || "",
                    requestId: e.requestId,
                    isLyricsMatch: e.isLyricsMatch,
                    hasAssociatedVideo: e.hasAssociatedVideo,
                    hasAssociatedAudio: e.hasAssociatedAudio,
                    mediaType: e.mediaType,
                    type: e.type
                }, s + e.uri)
            }
            ), [])
              , d = (0,
            a.useMemo)(( () => [bs.$C.INDEX, bs.$C.TITLE_AND_ARTIST, bs.$C.ALBUM, bs.$C.DURATION]), [])
              , p = (0,
            a.useCallback)((e => ({
                uri: e.uri
            })), [])
              , h = (0,
            O.RuZ)(t).toURI()
              , {spec: y, UBIFragment: g} = (0,
            _.r)(Fe.t, {
                data: {
                    uri: h,
                    reason: r
                }
            })
              , x = (0,
            a.useMemo)(( () => y.tracksFactory()), [y])
              , f = u.Ru.get("search.showing-category-query-songs", t);
            return n ? (0,
            m.jsx)(L.PageErrorTemplate, {}) : o || i && 0 !== i.length ? (0,
            m.jsx)(g, {
                spec: x,
                children: (0,
                m.jsx)("div", {
                    className: Us,
                    children: i && (0,
                    m.jsx)(le._, {
                        triggerOnInitialLoad: !1,
                        onReachBottom: l,
                        children: (0,
                        m.jsx)(fs.S4, {
                            ariaLabel: f,
                            hasHeaderRow: !0,
                            columns: d,
                            renderRow: c,
                            resolveItem: p,
                            nrTracks: i.length,
                            headerTop: 48,
                            tracks: i,
                            columnPersistenceKey: bs.SZ.SEARCH_RESULTS
                        }, t)
                    })
                })
            }) : (0,
            m.jsx)(g, {
                spec: y.emptyResultsFactory(),
                children: (0,
                m.jsx)(re, {
                    forChip: H.j7.tracks()
                })
            })
        }
          , _s = e => {
            let {results: s, displayChips: t} = e;
            const {category: a} = Z();
            return a ? "podcastAndEpisodes" === a ? (0,
            m.jsx)(Re, {
                results: s
            }) : "tracks" === a ? (0,
            m.jsx)(Fs, {}) : "episodes" === a ? (0,
            m.jsx)(be, {
                enableInfiniteScroll: !0,
                showTitle: !1
            }) : (0,
            m.jsx)(qe, {
                displayChips: t,
                category: a
            }) : (0,
            m.jsx)(L.PageErrorTemplate, {})
        }
        ;
        var Ms = t(99373)
          , Bs = t(95407)
          , Ls = t(90230)
          , Vs = t(93320)
          , Os = t(92124)
          , Ds = t(48237)
          , Hs = t(10700)
          , Ws = t(39125)
          , $s = t(35394)
          , Gs = t(27135)
          , zs = t(15400)
          , Ys = t(19239)
          , Qs = t(80464);
        const Zs = "MdWVOTFflb7OayRjn9pZ"
          , Xs = "N7Ng_kgcjiOOGs7Y48l9"
          , Js = "_4tnwlIafghEfbtatHyO"
          , Ks = "xgdE_xwOB8XLCxHOdp_I"
          , et = "YQfV97NZUj3G9JJwAiuY"
          , st = (e, s) => e(Gs.d, {
            concertUri: s
        })
          , tt = (e, s) => e(zs.$, {
            concertUri: s
        })
          , at = e => {
            const [s,t] = (0,
            a.useState)(!1)
              , [r,i] = (0,
            a.useState)(e.saved)
              , {unsaveConcertFn: n=tt, saveConcertFn: o=st, enqueueSnackbarFn: l=Ds.M8} = e.deps ?? {}
              , {getGraphQLLoader: c} = (0,
            Ys.mv)()
              , d = c()
              , p = (0,
            Qs.V)()
              , h = (0,
            O.o_h)(e.uri);
            if (!h)
                return null;
            const y = r ? Hs.k : Ws.P
              , g = r ? "textPositive" : void 0;
            return (0,
            m.jsx)(W.N_, {
                to: `/${h.toURLPath()}`,
                onClick: e.onClick,
                className: Ks,
                children: (0,
                m.jsxs)("div", {
                    className: Zs,
                    children: [(0,
                    m.jsxs)("div", {
                        className: Xs,
                        children: [(0,
                        m.jsxs)("div", {
                            className: Js,
                            children: [(0,
                            m.jsx)($.E, {
                                as: "div",
                                variant: "marginal",
                                children: e.date.month
                            }), (0,
                            m.jsx)($.E, {
                                as: "div",
                                variant: "bodySmallBold",
                                children: e.date.day
                            })]
                        }), (0,
                        m.jsxs)("div", {
                            className: et,
                            children: [(0,
                            m.jsx)($.E, {
                                children: e.title
                            }), (0,
                            m.jsx)($.E, {
                                semanticColor: "textSubdued",
                                variant: "bodySmall",
                                children: e.subtitle
                            })]
                        })]
                    }), !p && (0,
                    m.jsx)($s.H, {
                        semanticColor: g,
                        iconOnly: y,
                        "aria-label": u.Ru.get("concerts_interested_tooltip"),
                        onClick: async a => {
                            if (a.preventDefault(),
                            a.stopPropagation(),
                            !s) {
                                t(!0);
                                try {
                                    r ? (await n(d, e.uri),
                                    l(u.Ru.get("concerts_removed-from-your-saved-events")),
                                    i(!1)) : (e.onClickInterested && e.onClickInterested(),
                                    await o(d, e.uri),
                                    l(u.Ru.get("concerts_added-to-your-saved-events")),
                                    i(!0))
                                } finally {
                                    t(!1)
                                }
                            }
                        }
                    })]
                })
            })
        }
        ;
        var rt = t(92585);
        const it = "mh7QL6adD4FIJhD5Exb9"
          , nt = "FgawEObrsLOnHPzhrl5a"
          , ot = "PrDOhMH2lS5D8mMwbmF1"
          , lt = "hd4Hw4T7wuHZluBSTMZc"
          , ct = e => {
            const s = (0,
            O.o_h)(e.uri);
            return s ? (0,
            m.jsx)(W.N_, {
                to: `/artist/${s.id}/concerts`,
                onClick: e.onClick,
                className: lt,
                children: (0,
                m.jsxs)("div", {
                    className: it,
                    children: [(0,
                    m.jsx)("div", {
                        className: nt,
                        children: (0,
                        m.jsx)(rt.T, {
                            className: ot
                        })
                    }), e.children]
                })
            }) : null
        }
        ;
        var dt = t(68199);
        const ut = "ifJugrlP5ysjVmb2s4v3"
          , pt = "yKnPM8up5atlbSBdRXVv"
          , ht = "NsXrW_ZuSRESU0URaCER"
          , mt = e => {
            let {uri: s, date: t, title: r, subtitle: i, saved: n} = e;
            const {spec: o} = (0,
            _.r)(Vs.S, {
                data: {
                    uri: s
                }
            })
              , l = (0,
            he.s)()
              , c = (0,
            K.n)(o?.getAbsoluteLocation(), o)
              , d = new Date(t)
              , p = u.Ru.formatDate(d, {
                weekday: "short"
            })
              , h = u.Ru.formatDate(d, {
                hour: "numeric",
                minute: "numeric"
            })
              , y = u.Ru.formatDate(d, {
                day: "numeric"
            })
              , g = u.Ru.formatDate(d, {
                month: "short"
            })
              , x = (0,
            a.useMemo)(( () => o.localConcertFactory({
                uri: s
            })), [s, o])
              , f = (0,
            a.useMemo)(( () => o.interestedButtonFactory({
                uri: s
            })), [s, o]);
            return (0,
            m.jsx)("div", {
                ref: c,
                children: (0,
                m.jsx)(at, {
                    uri: s,
                    title: r,
                    saved: n,
                    subtitle: u.Ru.get("search.concert.event", p, h, i),
                    date: {
                        day: y,
                        month: g
                    },
                    onClick: () => {
                        l.logInteraction(x.hitUiNavigate({
                            destination: s
                        }))
                    }
                    ,
                    onClickInterested: () => {
                        l.logInteraction(f.hitUiSelect())
                    }
                })
            })
        }
          , yt = e => {
            let {artistUri: s} = e;
            const {spec: t} = (0,
            _.r)(Os._, {
                data: {
                    uri: s ?? ""
                }
            })
              , r = (0,
            he.s)()
              , i = (0,
            K.n)(t.getAbsoluteLocation(), t)
              , n = (0,
            a.useMemo)(( () => t.onTourShelfFactory({
                uri: s ?? ""
            })), [s, t]);
            return (0,
            m.jsx)("div", {
                ref: i,
                children: (0,
                m.jsx)(ct, {
                    uri: s ?? "",
                    onClick: () => {
                        r.logInteraction(n.hitUiNavigate({
                            destination: `${s}:concerts`
                        }))
                    }
                    ,
                    children: u.Ru.get("search.concerts.see-all")
                })
            })
        }
          , gt = e => {
            let {artistUri: s, concert: t} = e;
            return (0,
            m.jsxs)("section", {
                className: Pe()(ut),
                children: [(0,
                m.jsx)("div", {
                    className: dt.A.header,
                    children: (0,
                    m.jsx)("div", {
                        className: dt.A.topRow,
                        children: (0,
                        m.jsx)("div", {
                            className: dt.A.titleWrapper,
                            children: (0,
                            m.jsx)($.E, {
                                as: "h2",
                                variant: "titleSmall",
                                className: Pe()(dt.A.title, pt),
                                children: u.Ru.get("search.title.concerts")
                            })
                        })
                    })
                }), (0,
                m.jsx)("div", {
                    className: ht,
                    children: t ? (0,
                    m.jsx)(mt, {
                        ...t
                    }) : (0,
                    m.jsx)(yt, {
                        artistUri: s
                    })
                })]
            })
        }
        ;
        var xt = t(7519)
          , ft = t(15623);
        const bt = a.memo((function(e) {
            let {uri: s, name: t, duration: r, album: i, artists: n, index: o, imgUrl: c, isPlayable: d, isExplicit: p, is19PlusOnly: h, requestId: y, isLyricsMatch: g, hasAssociatedVideo: x, hasAssociatedAudio: f, mediaType: b, type: j, onPlay: v} = e;
            const C = !x && !f && j === ms.c.TRACK && b === hs.IX.Video
              , R = (0,
            ss.o)(p, C)
              , A = (0,
            l.NC)(Ie.LX5)
              , {isActive: P, isPlaying: w, triggerPlay: k, togglePlay: I} = (0,
            pe.P)({
                uri: s
            }, {
                featureIdentifier: "search",
                referrerIdentifier: "search"
            })
              , S = a.useMemo(( () => C ? {
                modes: {
                    media: "audio"
                }
            } : void 0), [C])
              , {spec: N} = (0,
            J.D)(_e.i, {
                data: {
                    position: o,
                    reason: y ?? "",
                    uri: s
                }
            })
              , E = (0,
            ps.T)(s)
              , {isPlayable: T, isAnyArtistBanned: U} = (0,
            os.g)(s, {
                isPlayable: d,
                isLocal: !1,
                isOutOfMarket: !1,
                artistUris: n?.map((e => e.uri))
            })
              , {unBanArtists: q} = (0,
            is.M)(n.map((e => e.uri)))
              , {badges: F, hasBadges: _} = (0,
            ys.b)({
                downloadAvailability: E,
                isExplicit: p,
                isMOGEFRestricted: h,
                isVideo: A && (x || C)
            })
              , M = (n || []).map((e => e.name)).join(u.Ru.getSeparator())
              , {isWeb: B} = (0,
            ls.V)()
              , L = (0,
            K.n)(N.getAbsoluteLocation(), N);
            return (0,
            m.jsx)("div", {
                ref: L,
                children: (0,
                m.jsx)(Me.h, {
                    menu: (0,
                    m.jsx)(Be.P, {
                        uri: s,
                        artists: n,
                        contextUri: s,
                        albumUri: i?.uri
                    }),
                    children: (0,
                    m.jsxs)(ts.w, {
                        uri: s,
                        contextUri: s,
                        index: o,
                        ariaRowIndex: o,
                        onTriggerPlay: (e, s) => {
                            v?.(),
                            k({
                                loggingParams: s,
                                ...S
                            })
                        }
                        ,
                        isActive: P,
                        isPlayable: T,
                        isAnyArtistBanned: U,
                        handleArtistBanUndoClick: q,
                        ageRestricted: h,
                        dragMetadata: {
                            name: t,
                            createdBy: M
                        },
                        spec: N,
                        isExplicit: p,
                        children: [(0,
                        m.jsxs)(Xe.U, {
                            ariaColIndex: 0,
                            children: [(0,
                            m.jsx)(ft.u, {
                                uri: s,
                                src: R ? void 0 : c,
                                onClick: (e, s) => {
                                    v?.(),
                                    I({
                                        loggingParams: s,
                                        ...S
                                    })
                                }
                                ,
                                isLocked: !1,
                                isPlaying: w,
                                isActive: P,
                                playAriaLabel: u.Ru.get("tracklist.a11y.play", t, M),
                                spec: N
                            }), (0,
                            m.jsxs)($e.l, {
                                children: [(0,
                                m.jsx)(Le.R, {
                                    enabled: B,
                                    uri: s,
                                    className: gs.A.rowTitle,
                                    children: (0,
                                    m.jsx)(es.p, {
                                        titleText: t,
                                        children: t
                                    })
                                }), _ && (0,
                                m.jsxs)(De.P, {
                                    children: [F.download && (0,
                                    m.jsx)(ds._, {}), F.explicit && (0,
                                    m.jsx)(cs.U, {}), F.nineteen && (0,
                                    m.jsx)(us.q, {
                                        className: gs.A.nineteen,
                                        size: 16
                                    }), F.isVideo && (0,
                                    m.jsx)(as.l, {})]
                                }), (0,
                                m.jsxs)(Ke.p, {
                                    children: [(0,
                                    m.jsx)(Oe.l, {
                                        artists: n,
                                        spec: N
                                    }), g && (0,
                                    m.jsx)(ns.G, {})]
                                })]
                            })]
                        }), (0,
                        m.jsxs)(Qe.l, {
                            ariaColIndex: 1,
                            children: [(0,
                            m.jsx)(rs.d, {
                                uri: s,
                                spec: N
                            }), (0,
                            m.jsx)(He.P, {
                                duration: r.milliseconds
                            }), (0,
                            m.jsx)(ze.Y, {
                                menu: (0,
                                m.jsx)(Be.P, {
                                    uri: s,
                                    artists: n,
                                    contextUri: s,
                                    albumUri: i?.uri
                                }),
                                label: u.Ru.get("more.label.track", t, M),
                                spec: N
                            })]
                        })]
                    })
                })
            })
        }
        ), ( (e, s) => e.uri === s.uri && e.index === s.index))
          , jt = a.memo((function(e) {
            let {tracks: s, query: t, onAddToHistory: r} = e;
            const i = (0,
            a.useCallback)(( (e, s) => {
                const t = (0,
                Ts.g)(e.album?.images, {
                    desiredSize: 40
                });
                return (0,
                m.jsx)(bt, {
                    uri: (0,
                    Es.a)(e),
                    duration: e.duration,
                    name: e.name,
                    album: e.album || void 0,
                    artists: e.artists,
                    isPlayable: e.isPlayable,
                    isExplicit: e.isExplicit,
                    is19PlusOnly: e.is19PlusOnly,
                    index: s,
                    imgUrl: t?.url || "",
                    requestId: e.requestId,
                    isLyricsMatch: e.isLyricsMatch,
                    hasAssociatedVideo: e.hasAssociatedVideo,
                    hasAssociatedAudio: e.hasAssociatedAudio,
                    mediaType: e.mediaType,
                    type: e.type,
                    onPlay: () => r(e)
                }, e.uri)
            }
            ), [r])
              , n = (0,
            a.useMemo)(( () => [bs.$C.TITLE_AND_ARTIST, bs.$C.DURATION]), [])
              , o = (0,
            a.useCallback)((e => ({
                uri: e.uri
            })), []);
            return s && (0,
            m.jsx)(fs.S4, {
                ariaLabel: u.Ru.get("search.a11y.songs-search-results"),
                renderRow: i,
                rowPlaceholder: xt.qq,
                nrTracks: Math.min(s.length, 4),
                tracks: s,
                resolveItem: o,
                columns: n
            }, t)
        }
        ), ( (e, s) => e.tracks === s.tracks))
          , vt = "ib6ClWIXW5DmWXaC0W08"
          , Ct = "nTbpvWKW0gZOhU4sejUH"
          , Rt = e => {
            let {tracks: s, query: t, className: r, showSeeAll: i=!0, spec: n, onAddToHistory: o} = e;
            const l = (0,
            he.s)()
              , c = (0,
            a.useCallback)(( () => (0,
            m.jsx)("div", {
                className: Ct,
                children: (0,
                m.jsx)(a.Suspense, {
                    fallback: null,
                    children: (0,
                    m.jsx)(jt, {
                        tracks: s.items,
                        query: t,
                        onAddToHistory: o
                    })
                })
            })), [t, s, o])
              , d = `spotify:app:search:${encodeURIComponent(t)}:tracks`
              , p = (0,
            a.useCallback)(( () => {
                const e = n.headerFactory().titleFactory().hitUiNavigate({
                    destination: d
                });
                l.logInteraction(e)
            }
            ), [l, n, d])
              , h = (0,
            a.useCallback)(( () => {
                const e = n.headerFactory().seeAllFactory().hitUiNavigate({
                    destination: d
                });
                l.logInteraction(e)
            }
            ), [l, n, d]);
            return s.items.length ? (0,
            m.jsxs)("section", {
                className: Pe()(vt, r),
                "aria-label": u.Ru.get("search.title.tracks"),
                "data-testid": "search-tracks-result",
                children: [(0,
                m.jsx)("div", {
                    className: dt.A.header,
                    children: (0,
                    m.jsx)(D.k, {
                        seeAllUri: d,
                        onClickTitle: p,
                        onClickSeeAll: h,
                        title: u.Ru.get("search.title.tracks"),
                        titleUri: d,
                        showSeeAll: i && s.items.length > 4
                    })
                }), (0,
                m.jsx)(U.r, {
                    spec: n,
                    children: (0,
                    m.jsx)(Ne.E, {
                        render: c
                    })
                })]
            }) : null
        }
          , At = e => {
            let {topRecommendations: s, className: t, onAddToHistory: a, position: r} = e;
            const i = s.totalCount || 0;
            return (0,
            m.jsx)(b.p, {
                index: r,
                id: "top-recommendations",
                className: t,
                total: i,
                title: u.Ru.get("artist-page.featuring", s.artistName),
                children: s.items.map(( (e, s) => (0,
                m.jsx)(je.Q, {
                    onClick: () => a(e),
                    onPlay: () => a(e),
                    entity: e,
                    index: s
                }, e.uri)))
            })
        }
        ;
        var Pt = t(92544);
        const wt = "vKsgiy0W3aHYmZUlwHoQ"
          , kt = "w2O3N2xilgVcd4ep6cQL"
          , It = "T2cpdJTvNpOFPvN4WJM4"
          , St = "u372KlVrkMz1ZpJ89LMG"
          , Nt = "DIYNtp69Gd1l3eaBT3Bg"
          , Et = "cXdpTaiu9PEfynRcDKrU"
          , Tt = "yZ3EPSfU0nkNoCu19iPL"
          , Ut = "OtEFcRGkMfUXBZC2HF5M"
          , qt = e => {
            let {topResults: s, onAddToHistory: t} = e;
            const [a] = s.items;
            return a && (0,
            m.jsx)(Pt.$, {
                total: 1,
                className: wt,
                title: u.Ru.get("search.title.top-result"),
                withEncoreCards: !1,
                children: [(0,
                m.jsx)("div", {
                    "aria-live": "polite",
                    "data-testid": "top-result-card",
                    className: kt,
                    children: (0,
                    m.jsx)(je.Q, {
                        isHero: !0,
                        index: 0,
                        onClick: () => t(a),
                        onPlay: () => t(a),
                        entity: a
                    })
                }, "top-result-item")]
            })
        }
        ;
        var Ft = t(51697);
        const _t = e => e?.type === ms.c.ARTIST
          , Mt = e => {
            let {results: s} = e;
            const {query: t, onAddToHistory: r, serpId: i} = Z()
              , n = (0,
            O.RuZ)(t).toURI()
              , {spec: o, UBIFragment: l} = (0,
            Ft.$)(Bs.P, {
                data: {
                    uri: n,
                    reason: i
                }
            })
              , c = s.topResults.items.length > 0
              , d = s.tracks.items.length > 0
              , u = s.topRecommendations.items.length > 0
              , [p] = s.topResults.items ?? []
              , h = _t(p) ? (e => {
                const [s] = e ?? [];
                if (s && "uri"in (s.data ?? {}))
                    return {
                        uri: s.data.uri,
                        date: s.data.startDateIsoString,
                        title: s.data.location.city,
                        subtitle: s.data.location.name,
                        saved: s.data.saved
                    }
            }
            )(p.localConcerts?.items) : void 0
              , y = _t(p) && (p.hasConcerts || !!h)
              , g = (0,
            a.useMemo)(( () => ({
                topResult: o.topResultFactory(),
                trackList: o.trackListFactory(),
                shelves: o.shelvesFactory()
            })), [o]);
            return (0,
            m.jsx)(Ne.E, {
                className: It,
                rowGap: Ms.WG,
                colGap: Ms.CJ,
                testId: "search-results",
                render: e => {
                    let a, i, {columnCount: n} = e;
                    return c ? a = n > 3 ? Nt : Et : u && (n > 5 && d ? (a = St,
                    i = Tt) : (a = Et,
                    i = Ut)),
                    (0,
                    m.jsxs)(m.Fragment, {
                        children: [c && (0,
                        m.jsx)(l, {
                            spec: g.topResult,
                            children: (0,
                            m.jsx)(qt, {
                                topResults: s.topResults,
                                onAddToHistory: r
                            })
                        }), (0,
                        m.jsxs)("section", {
                            className: a,
                            children: [y && (0,
                            m.jsx)(gt, {
                                artistUri: p.uri,
                                concert: h
                            }), d && (0,
                            m.jsx)(Rt, {
                                spec: g.trackList,
                                query: t,
                                tracks: y ? {
                                    totalCount: 3,
                                    items: s.tracks.items.slice(0, 3)
                                } : s.tracks,
                                onAddToHistory: r,
                                showSeeAll: !1
                            })]
                        }), u && (0,
                        m.jsx)(l, {
                            spec: g.shelves,
                            children: (0,
                            m.jsx)(At, {
                                position: 0,
                                query: t,
                                className: i,
                                topRecommendations: s.topRecommendations,
                                onAddToHistory: r,
                                showSeeAll: !1
                            })
                        }), H.ud.map(( (e, a) => (0,
                        m.jsx)(l, {
                            spec: g.shelves,
                            children: (0,
                            m.jsx)(ve, {
                                position: a + 1,
                                category: e,
                                title: H.j7[e](),
                                query: t,
                                results: s[e],
                                onAddToHistory: r,
                                showSeeAll: !1
                            })
                        }, `search-shelf-${e}`)))]
                    })
                }
            })
        }
          , Bt = e => {
            let {results: s, hasResults: t} = e;
            const {query: a, serpId: r} = Z()
              , i = (0,
            O.RuZ)(a).toURI()
              , n = !(0,
            X.n)()
              , {spec: o, UBIFragment: l} = (0,
            Ft.$)(Bs.P, {
                data: {
                    uri: i,
                    reason: r
                }
            });
            return n ? (0,
            m.jsx)(re, {}) : s ? s && !t ? (0,
            m.jsx)(l, {
                spec: o.emptyResultsFactory(),
                children: (0,
                m.jsx)(re, {})
            }) : (0,
            m.jsx)(Mt, {
                results: s
            }) : (0,
            m.jsx)(Ls.LoadingPage, {
                hasError: !1,
                errorMessage: ""
            })
        }
          , Lt = new k.l("searchDesktop","query","d9f785900f0710b31c07818d617f4f7600c1e21217e80f5b043d1e78d74e6026",null);
        var Vt = t(79051);
        const Ot = new k.l("searchAlbums","query","a71d2c993fc98e1c880093738a55a38b57e69cc4ce5a8c113e6c5920f9513ee2",null)
          , Dt = (e, s) => {
            const t = "object" == typeof e?.requestIds ? e?.requestIds : void 0
              , a = t?.[s]
              , r = "object" == typeof a ? a : void 0;
            return "string" == typeof r?.["search-api"] ? r?.["search-api"] : void 0
        }
          , Ht = e => Dt(e, "/searchV2")
          , Wt = e => Dt(e, "/searchV2/topResultsV2")
          , $t = (e, s) => ({
            ...e,
            pagingInfo: s
        });
        var Gt = t(31321);
        const zt = new k.l("searchArtists","query","0e6f9020a66fe15b93b3bb5c7e6484d1d8cb3775963996eaede72bac4d97e909",null);
        var Yt = t(41995);
        const Qt = new k.l("searchAudiobooks","query","5c6347dec82c306ba125f2396e67be997eabcc4b4760da068874c66f52105e32",null);
        var Zt = t(45433);
        const Xt = new k.l("searchAuthors","query","4a9d403a7cbc7e19da5520d619a865472b35382b043bfa458154e73a5c6f46bd",null);
        var Jt = t(35141);
        const Kt = new k.l("searchEpisodes","query","2fcb8b20ea473814e9f85eda12cd057a233aa8580293d8b1add3b67ecbba4377",null);
        const ea = new k.l("searchFullEpisodes","query","85faf0563998f70f8a0dd430bb5ae5d57ba176c42b33a8937520fe976ba7e5fc",null);
        t(2557);
        var sa = t(97011)
          , ta = t(56859);
        const aa = {
            ...Jt.q,
            description: "",
            htmlDescription: "",
            coverArt: [],
            trailer: null,
            topics: [],
            podcastType: "UNKNOWN",
            showTypes: [],
            publisherName: "",
            consumptionOrder: "recent",
            gatedContentAccessReason: void 0,
            isLocked: !1
        };
        function ra(e, s) {
            return e.map((e => function(e, s) {
                if ("Episode" !== e.data?.__typename)
                    return null;
                let t = aa;
                "Podcast" === e.data.podcastV2.data.__typename && (t = (0,
                sa._v)(e.data.podcastV2.data));
                return {
                    requestId: s,
                    episode: (0,
                    sa.S)(e.data),
                    show: t
                }
            }(e, s))).filter(ta.P)
        }
        async function ia(e, s, t) {
            const a = await e(ea, s, void 0, void 0, t)
              , r = a?.data?.searchV2?.episodes;
            return r ? function(e, s) {
                return {
                    items: ra(e?.items || [], s),
                    totalCount: e?.totalCount || 0
                }
            }(r, Ht(a?.extensions)) : null
        }
        var na = t(57799);
        const oa = new k.l("searchGenres","query","9e1c0e056c46239dd1956ea915b988913c87c04ce3dadccdb537774490266f46",null);
        var la = t(41994);
        const ca = new k.l("searchPlaylists","query","fc3a690182167dbad20ac7a03f842b97be4e9737710600874cb903f30112ad58",null);
        var da = t(92282);
        const ua = new k.l("searchPodcasts","query","f4d1e6ff2422dd998e26ba696e853e4372811843361e91105f736d128d3d64e0",null);
        var pa = t(69397)
          , ha = t(7467)
          , ma = t(43597)
          , ya = t(21789);
        function ga(e, s) {
            const t = e?.itemsV2 ?? []
              , a = t.map((e => {
                let {item: t, matchedFields: a} = e;
                const {__typename: r} = t;
                switch (r) {
                case "AlbumResponseWrapper":
                    return (0,
                    Vt.l)(t, s);
                case "ArtistResponseWrapper":
                    return (0,
                    Gt.f)(t, s);
                case "AudiobookResponseWrapper":
                    return (0,
                    Yt.V)(t, s);
                case "EpisodeResponseWrapper":
                    return (0,
                    Jt.t)(t, s);
                case "GenreResponseWrapper":
                    return (0,
                    na.z)(t, s);
                case "PlaylistResponseWrapper":
                    return (0,
                    la.G)(t, s);
                case "PodcastResponseWrapper":
                    return (0,
                    da.yY)(t, s);
                case "TrackResponseWrapper":
                    return (0,
                    ha.g)(t, a, s);
                case "UserResponseWrapper":
                    return (0,
                    ma.n)(t, s);
                case "PreReleaseResponseWrapper":
                    return (0,
                    pa.M)(t, s);
                case "AuthorResponseWrapper":
                    return (0,
                    Zt.j)(t, s);
                case "UnknownTypeWrapper":
                case "SearchAutoCompleteEntity":
                case "SearchSection":
                    return null;
                default:
                    return (0,
                    R.k)(r),
                    null
                }
            }
            )).filter(ta.P);
            return {
                totalCount: t.length,
                items: a
            }
        }
        function xa(e, s) {
            const t = e?.featured || [];
            return {
                artistName: t.length ? fa(e) : "",
                items: t?.map((e => (0,
                la.G)(e, s))).filter(ta.P) || [],
                totalCount: t.length || 0
            }
        }
        function fa(e) {
            const s = (0,
            ya.no)(e, "itemsV2", []);
            try {
                const e = (0,
                ya.Jt)(s.map((e => {
                    let {item: s} = e;
                    return s
                }
                )).filter(Boolean), "0.data");
                return e?.profile?.name || ""
            } catch {
                return ""
            }
        }
        const ba = new k.l("searchTopResultsOnly","query","110b0fd7638e42f548083f15e922437b747105063fe3458f5db7dba6cdefb25c",null);
        const ja = new k.l("searchTracks","query","bc1ca2fcd0ba1013a0fc88e6cc4f190af501851e3dafd3e1ef85840297694428",null);
        const va = new k.l("searchUsers","query","d3f7547835dc86a4fdf3997e0f79314e7580eaf4aaf2f4cb1e71e189c5dfcb1f",null);
        const Ca = {
            items: [],
            totalCount: 0,
            pagingInfo: {
                nextOffset: null
            }
        }
          , Ra = {
            albums: {
                items: [],
                totalCount: 0
            },
            artists: {
                items: [],
                totalCount: 0
            },
            authors: {
                items: [],
                totalCount: 0
            },
            episodes: {
                items: [],
                totalCount: 0
            },
            genres: {
                items: [],
                totalCount: 0
            },
            playlists: {
                items: [],
                totalCount: 0
            },
            podcasts: {
                items: [],
                totalCount: 0
            },
            audiobooks: {
                items: [],
                totalCount: 0
            },
            topResults: {
                items: []
            },
            tracks: {
                items: [],
                totalCount: 0
            },
            users: {
                items: [],
                totalCount: 0
            },
            topRecommendations: {
                artistName: "",
                items: [],
                totalCount: 0
            },
            chipOrder: {
                items: []
            }
        };
        class Aa {
            constructor(e) {
                this._request = e
            }
            async getSearchResults(e, s) {
                const t = await this._request(Lt, e, void 0, void 0, s)
                  , a = t?.data?.searchV2;
                if (!a)
                    return Ra;
                const r = Ht(t?.extensions)
                  , i = Wt(t?.extensions);
                return {
                    albums: (0,
                    Vt.r)(a.albumsV2, r),
                    artists: (0,
                    Gt.P)(a.artists, r),
                    authors: (0,
                    Zt.z)(a.authors ?? null, r),
                    episodes: (0,
                    Jt.NU)(a.episodes, r),
                    genres: (0,
                    na.F)(a.genres, r),
                    playlists: (0,
                    la.Q)(a.playlists, r),
                    podcasts: (0,
                    da.Yq)(a.podcasts, r),
                    audiobooks: (0,
                    Yt.t)(a.audiobooks ?? null, r),
                    tracks: (0,
                    ha.x)(a.tracksV2, r),
                    users: (0,
                    ma.H)(a.users, r),
                    topResults: ga(a.topResultsV2, i),
                    topRecommendations: xa(a.topResultsV2, i),
                    chipOrder: a.chipOrder
                }
            }
            async getSearchCategoryResults(e, s, t) {
                let a = null;
                const r = {
                    includePreReleases: !1,
                    numberOfTopResults: 20,
                    ...s
                };
                switch (e) {
                case "albums":
                    a = await async function(e, s, t) {
                        const a = await e(Ot, s, void 0, void 0, t)
                          , r = a?.data?.searchV2?.albumsV2;
                        return r ? $t((0,
                        Vt.r)(r, Ht(a?.extensions)), r.pagingInfo) : null
                    }(this._request, r, t);
                    break;
                case "artists":
                    a = await async function(e, s, t) {
                        const a = await e(zt, s, void 0, void 0, t)
                          , r = a?.data?.searchV2?.artists;
                        return r ? $t((0,
                        Gt.P)(r, Ht(a?.extensions)), r.pagingInfo) : null
                    }(this._request, r, t);
                    break;
                case "authors":
                    a = await async function(e, s, t) {
                        const a = await e(Xt, s, void 0, void 0, t)
                          , r = a?.data?.searchV2?.authors;
                        return r ? $t((0,
                        Zt.z)(r, Ht(a?.extensions)), r.pagingInfo) : null
                    }(this._request, r, t);
                    break;
                case "episodes":
                    a = await async function(e, s, t) {
                        const a = await e(Kt, s, void 0, void 0, t)
                          , r = a?.data?.searchV2?.episodes;
                        return r ? $t((0,
                        Jt.NU)(r, Ht(a?.extensions)), r.pagingInfo) : null
                    }(this._request, r, t);
                    break;
                case "genres":
                    a = await async function(e, s, t) {
                        const a = await e(oa, s, void 0, void 0, t)
                          , r = a?.data?.searchV2?.genres;
                        return r ? $t((0,
                        na.F)(r, Ht(a?.extensions)), r.pagingInfo) : null
                    }(this._request, r, t);
                    break;
                case "playlists":
                    a = await async function(e, s, t) {
                        const a = await e(ca, s, void 0, void 0, t)
                          , r = a?.data?.searchV2?.playlists;
                        return r ? $t((0,
                        la.Q)(r, Ht(a?.extensions)), r.pagingInfo) : null
                    }(this._request, r, t);
                    break;
                case "podcasts":
                    a = await async function(e, s, t) {
                        const a = await e(ua, s, void 0, void 0, t)
                          , r = a?.data?.searchV2?.podcasts;
                        return r ? $t((0,
                        da.Yq)(r, Ht(a?.extensions)), r.pagingInfo) : null
                    }(this._request, r, t);
                    break;
                case "audiobooks":
                    a = await async function(e, s, t) {
                        const a = await e(Qt, s, void 0, void 0, t)
                          , r = a?.data?.searchV2?.audiobooks;
                        return r ? $t((0,
                        Yt.t)(r, Ht(a?.extensions)), r.pagingInfo) : null
                    }(this._request, r, t);
                    break;
                case "tracks":
                    a = await async function(e, s, t) {
                        const a = await e(ja, s, void 0, void 0, t)
                          , r = a?.data?.searchV2?.tracksV2;
                        return r ? $t((0,
                        ha.x)(r, Ht(a?.extensions)), r.pagingInfo) : null
                    }(this._request, r, t);
                    break;
                case "users":
                    a = await async function(e, s, t) {
                        const a = await e(va, s, void 0, void 0, t)
                          , r = a?.data?.searchV2?.users;
                        return r ? $t((0,
                        ma.H)(r, Ht(a?.extensions)), r.pagingInfo) : null
                    }(this._request, r, t);
                    break;
                case "topResults":
                    a = await async function(e, s, t) {
                        const a = await e(ba, s, void 0, void 0, t)
                          , r = a?.data?.searchV2?.topResultsV2;
                        return r ? ga(r, Wt(a?.extensions)) : null
                    }(this._request, r, t);
                    break;
                case "podcastAndEpisodes":
                    a = await ia(this._request, r, t);
                    break;
                default:
                    (0,
                    R.k)(e)
                }
                return a || Ca
            }
            async getFullEpisodes(e) {
                const s = {
                    searchTerm: e,
                    offset: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    limit: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 25
                };
                return await ia(this._request, s) || Ca
            }
        }
        var Pa = t(38260)
          , wa = t(76355)
          , ka = t(58028)
          , Ia = t(68734)
          , Sa = t(254);
        const Na = "kMLumUDiP1DgYtLABkVO"
          , Ea = e => {
            let {results: s, hasResults: t} = e;
            const {category: a} = Z()
              , r = (0,
            ka.Qe)(s, a, !1)
              , n = "podcasts" !== a && "episodes" !== a;
            return (0,
            m.jsxs)(m.Fragment, {
                children: [(0,
                m.jsx)(Ns, {
                    searchCategories: r,
                    selectedCategory: a,
                    displayChips: n
                }), (0,
                m.jsx)("div", {
                    className: "contentSpacing",
                    id: "searchPage",
                    children: (0,
                    m.jsx)(Ne.E, {
                        className: Na,
                        render: () => (0,
                        m.jsxs)(i.BV, {
                            children: [(0,
                            m.jsx)(i.qh, {
                                path: "/",
                                element: (0,
                                m.jsx)(h.e, {
                                    pageId: d.$h.FIND,
                                    entityUri: "spotify:app:search",
                                    children: (0,
                                    m.jsx)(B, {})
                                })
                            }), (0,
                            m.jsx)(i.qh, {
                                path: ":query",
                                element: (0,
                                m.jsx)(x, {
                                    children: (0,
                                    m.jsx)(Bt, {
                                        results: s,
                                        hasResults: t
                                    })
                                })
                            }), (0,
                            m.jsx)(i.qh, {
                                path: ":query/:category",
                                element: (0,
                                m.jsx)(g, {
                                    children: (0,
                                    m.jsx)(_s, {
                                        results: s,
                                        displayChips: n
                                    })
                                })
                            })]
                        })
                    })
                })]
            })
        }
        ;
        const Ta = a.memo((function() {
            const e = (0,
            r.jE)()
              , s = (0,
            l.NC)(Ie.KvH)
              , t = (0,
            l.NC)(Ie.Lh5)
              , i = (0,
            l.NC)(Ie.Wvg)
              , n = !(0,
            X.n)()
              , [{category: d, query: h},y] = (0,
            wa.o)();
            (0,
            Ia.m)("search");
            const [g,x] = (0,
            a.useState)({
                results: null,
                queryForResults: h ?? ""
            })
              , f = g.results
              , b = function(e) {
                return null !== e && void 0 !== Object.keys(e).find((s => "chipOrder" !== s && e[s].items.length > 0))
            }(f)
              , {request: j} = a.useContext(Sa.j)
              , v = (0,
            a.useMemo)(( () => new Aa(j)), [j])
              , {addToSearchHistory: C} = (0,
            Pa.k)()
              , R = (0,
            a.useCallback)((e => {
                C([e])
            }
            ), [C])
              , A = (0,
            a.useCallback)((async e => {
                e === g.queryForResults && b || y(e, d, !1)
            }
            ), [g.queryForResults, d, b, y]);
            (0,
            a.useEffect)(( () => {
                if (!h)
                    return;
                if (n)
                    return void x({
                        results: null,
                        queryForResults: h
                    });
                const a = ["searchPageResults", h, {
                    numberOfTopResults: 5,
                    isConcertsInSearchEnabled: s,
                    isLocalConcertsInSearchEnabled: t,
                    isAuthorsInSearchEnabled: i
                }];
                let r = !0;
                return e.ensureQueryData({
                    queryKey: a,
                    queryFn: e => {
                        let {signal: a} = e;
                        const r = {
                            searchTerm: h,
                            offset: 0,
                            limit: 10,
                            numberOfTopResults: 5,
                            includeAudiobooks: !0,
                            includeArtistHasConcertsField: s,
                            includePreReleases: !0,
                            includeLocalConcertsField: t,
                            includeAuthors: i
                        };
                        return v.getSearchResults(r, a)
                    }
                    ,
                    gcTime: 9e5,
                    staleTime: 9e5
                }).then((e => {
                    r && x({
                        results: e,
                        queryForResults: h
                    })
                }
                )).catch((e => {
                    if (("code"in e ? e.code : null) !== c.TransportErrors.HTTP_REQUEST_ABORTED)
                        throw e
                }
                )),
                () => {
                    r = !1
                }
            }
            ), [v, i, s, t, n, h, e]),
            (0,
            a.useEffect)(( () => {
                h || x({
                    results: null,
                    queryForResults: ""
                })
            }
            ), [h]);
            const P = (0,
            a.useMemo)(( () => o().create().toString()), [d, g.queryForResults])
              , w = (0,
            a.useMemo)(( () => ({
                api: v,
                category: d,
                query: g.queryForResults,
                onAddToHistory: R,
                onSearchRequest: A,
                serpId: P
            })), [v, d, R, A, g.queryForResults, P]);
            return (0,
            m.jsxs)(Q, {
                value: w,
                children: [(0,
                m.jsx)(p.Q, {
                    children: u.Ru.get("search.page-title")
                }), (0,
                m.jsx)(Ea, {
                    results: f,
                    hasResults: b
                })]
            })
        }
        ))
    }
}]);
//# sourceMappingURL=xpui-routes-search.b69b7ca3.js.map
