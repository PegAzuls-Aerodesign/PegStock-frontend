"use client";

import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type TokenDto } from "./autenticacao.models";
import { useEntrar } from "./autenticacao.service";
import {
  removerTokenDoLocalStorage,
  tokenSalvoNoLocalStorage,
} from "./autenticacao.storage";

interface NaoAutenticado {
  token: null;
  autenticando: false;
  autenticado: false;
}

interface Autenticando {
  token: TokenDto | null;
  autenticando: true;
  autenticado: false;
}

interface Autenticado {
  token: TokenDto;
  autenticando: false;
  autenticado: true;
}

type Sessao = NaoAutenticado | Autenticando | Autenticado;

type ContextoDeAutenticacao = Sessao & {
  entrar: ReturnType<typeof useEntrar>;
  sair: () => void;
};

const AutenticacaoContext = createContext<ContextoDeAutenticacao | undefined>(
  undefined,
);

export const AutenticacaoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState(tokenSalvoNoLocalStorage());

  const router = useRouter();

  const entrar = useEntrar({
    onSuccess(_, token) {
      setToken(token);
    },
    onError() {
      setToken(null);
    },
  });

  const sair = useCallback(() => {
    router.push("/entrar");
    removerTokenDoLocalStorage();

    setToken(null);
  }, [setToken, router]);

  const { toast } = useToast();

  // Executa somente uma vez, quando a aplicação é iniciada
  // Recupera a autenticação a partir do localStorage
  useEffect(() => {
    function recuperarAutenticacao() {
      try {
        const tokenSalvo = tokenSalvoNoLocalStorage();
        if (!tokenSalvo) {
          return;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: "Sessão expirada",
            description: "Faça login novamente para continuar.",
            variant: "destructive",
          });

          removerTokenDoLocalStorage();
          setToken(null);
        } else {
          toast({
            title: "Erro ao recuperar dados de sessão",
            description: "Verifique sua conexão e tente novamente.",
            variant: "destructive",
          });
        }

        router.push("/entrar");
      }
    }

    void recuperarAutenticacao();
  }, [router, toast]);

  const contexto: ContextoDeAutenticacao = useMemo(() => {
    const funcoes = { entrar, sair };

    if (!token) {
      return {
        token: null,
        autenticando: entrar.isPending || !!token,
        usuario: null,
        autenticado: false,
        ...funcoes,
      };
    }

    return {
      token,
      autenticando: false,
      autenticado: true,
      ...funcoes,
    };
  }, [entrar, sair, token]);

  return (
    <AutenticacaoContext.Provider value={contexto}>
      {children}
    </AutenticacaoContext.Provider>
  );
};

export const useAutenticacao = () => {
  const context = useContext(AutenticacaoContext);
  if (!context) {
    throw new Error(
      "useAutenticacao must be used within an AutenticacaoProvider",
    );
  }
  return context;
};
