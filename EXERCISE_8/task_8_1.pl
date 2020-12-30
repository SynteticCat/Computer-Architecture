writeNumber(X) :- X_NEW is X, write(X_NEW).

fib(F1, F2, L, R) :-
    F1 =< R,
    (
        (F1 >= L, writeNumber(F1), nl, fail);
        (F3 is F1 + F2, fib(F2, F3, L, R))
    ).

start(L, R) :- L =< R, fib(0, 1, L, R).