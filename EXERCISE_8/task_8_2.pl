writeNumber(X) :- X_NEW is X, write(X_NEW).

sqrt(NUM, L, R) :-
    POW_NUM is NUM * NUM,
    POW_NUM =< R,
    (
        (POW_NUM >= L, writeNumber(POW_NUM), nl, fail);
        (NEXT_NUM is NUM + 1, sqrt(NEXT_NUM, L, R))
    ).

start(L, R) :- L =< R, sqrt(1, L, R).